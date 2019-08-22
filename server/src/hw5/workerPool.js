import { Worker, workerData } from 'worker_threads';
import { EventEmitter } from 'events';

export class WorkerPool {

  constructor(path, numOfWorkers) {
    console.log(`Creating thread pool for ${path} with max threads count ${numOfWorkers}`);
    this.freeWorkers = [];
    this.workingWorkers = [];
    for (let i = 0; i < numOfWorkers; i++) {
      this.freeWorkers.push(this.createWorker(path, i + 1));
    }
    this.onNewWorker = new EventEmitter();
  }

  createWorker(path, index) {
    let worker = new Worker(path, { workerData: index });
    worker.on('exit', () => { this.onWorkerExit(worker); });
    return worker;
  }

  onWorkerExit(worker) {
    if (!worker) return;
    
    console.log(`Exited worker ${workerData}`);
    this.freeWorkers.push(worker);
    this.onNewWorker.emit('newWorker');
    var index = this.workingWorkers.indexOf(worker);
    if (index > -1) {
      this.workingWorkers.splice(index, 1);
    }
  }

  async run(...args) {
    console.log(`Create new thread`);
    let selectedWorker = await this.getFreeWorker();
    this.workingWorkers.push(selectedWorker);
    selectedWorker.postMessage(args);
    return new Promise((resolve, reject) => {
      selectedWorker.on("message", (response) => {
        resolve(response);
      });
      selectedWorker.on("error", (err) => { reject(err); })
    });
  }

  async getFreeWorker() {
    if (this.freeWorkers.length > 0) {
      return Promise.resolve(this.freeWorkers.shift());
    }
    return new Promise((resolve, reject) => {
      this.onNewWorker.on('newWorker', () => {
        resolve(this.freeWorkers.shift());
      });
    });
  }
}
