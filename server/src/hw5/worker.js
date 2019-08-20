import { workerData, parentPort } from 'worker_threads';
import factorial from './factorial';

workerData.on("message", (n) => {
    console.log("worker start processing");

})

parentPort.once('message', (message) => {
    let response;
    try {
        var n = Number.parseInt(message);
        response = factorial(n)
    }
    catch (err) {
        //log error
    }
    parentPort.postMessage(response);
});
