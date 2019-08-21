const {parentPort} = require('worker_threads');
const factorial = require('./factorial');

parentPort.once('message', (message) => {
    debugger;
    let response;
    try {
        var n = Number.parseInt(message);
        response = factorial(n)
    }
    catch (err) {
        console.log(err);
        //log error
    }
    parentPort.postMessage(response);
});