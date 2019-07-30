let count = 0;

export default function requestCounter(req, resp, next){
    console.log(`Request #${++count} arrived`);
    next();
};