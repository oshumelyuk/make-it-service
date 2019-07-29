import dateUtils from "../utils/dateUtils";

const dateFormatter = dateUtils();
function requestLogger(req, resp, next){
    req.locals = req.locals || {};
    req.locals.hrstart = process.hrtime();
    req.locals.start = new Date();
    next();
}

function responseLogger(req, resp, next){
    const hrend = process.hrtime(req.locals.hrstart);
    let actionExecutionTime = `${hrend[0]}s ${hrend[1] / 1000000}ms`;
    const startTime = dateFormatter.toString(req.locals.start); 
    console.log(`New request with method '${req.method}' to URL '${req.originalUrl}' started executing at ${startTime}. Total execution time: ${actionExecutionTime}`);
    next();
}

export {requestLogger, responseLogger}