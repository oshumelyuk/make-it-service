const { parentPort } = require('worker_threads');
const factorial = require('./factorial');

if (!parentPort) {
    console.log("cannot run worker thread without parent scope")
    return;
}

parentPort.on('message', (message) => {
    let response = 100;
    let n = Number.parseInt(message);
    console.log(`starting calculating factorial of ${n}`)
    response = factorial(n)
    parentPort.postMessage(response);
});