import { Worker, threadId } from 'worker_threads';

export class WorkerPool {
  constructor(path, numOfWorkers) {
    this.freeWorkers = [];
    this.workingWorkers = [];
    for (let i = 0; i < numOfWorkers; i++) {
      let worker = new Worker(path);
      worker.on('exit', () => {
        this.freeWorkers.push(worker);

        var index = this.workingWorkers.indexOf(worker);
        if (index > -1) {
          this.workingWorkers.splice(index, 1);
        }
      });
      worker.on
      this.freeWorkers.push(worker);
    }
  }

  async run(...args) {
    let selectedWorker = this.freeWorkers.shift();
    this.workingWorkers.push(selectedWorker);
    selectedWorker.postMessage("run");
  }
}
