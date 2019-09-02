const http = require('http');
const URL = require('url');
const DEFAULT_PORT = 7000;

const routes = new Map([
    ['/users', (rawData, resp) => {
        let body = JSON.parse(Buffer.concat(rawData));
        // do some logic
        resp.setHeader('content-type', 'application/json');
        resp.end(JSON.stringify({
            ok: 'true', 
            users: body
        }));
    }], 
    [
    '/filters',(req, resp) => {
        resp.setHeader('content-type', 'application/json');
        resp.end(JSON.stringify({status: "OK", data: "no filters"}));
    }],    
    [
    '/say-hello',(rawData, resp, url) => {
        let params = new URL.URLSearchParams(url.query);
        let name = params.get('name');
        resp.setHeader('content-type', 'text/json');
        resp.end(`Hello, ${name}`);
    }],
    [
    'default',(req, resp) => {
        resp.setHeader('content-type', 'application/json');
        resp.end(JSON.stringify({status: "Bad Request"}));
    }]
]);

const server = http.createServer((req, resp) => {
    const rawData = [];
    req.on('data', chunk => {
        rawData.push(chunk);
    });
    req.on('end', () => {
        var url = URL.parse(req.url);
        var method = routes.get(url.pathname) || routes.get('default');
        method(rawData, resp, url);
    });
});

const {PORT = DEFAULT_PORT} = process.env;
server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});

server.on ('error', err => {
    console.error(`OOPS! Error: ${err}`);
});

process.on('uncaughtException', (err) => {
    console.error(`Uncaught error ${err}`);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error(`Error during Promise ${promise}. Reason ${reason}`);
});