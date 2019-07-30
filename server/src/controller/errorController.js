export default function errorController () {

    let error404 = function(req, resp, next){
        // if we get here means that no routes are found
        resp.status(404).end("404: page not found");
    };

    let error500 = function(error, req, resp, next){
        // Any error request to this server will get here
        resp.status(500).json({
            success: false,
            message: error.message
        });
    };

    return {
        error404,
        error500
    };

};
