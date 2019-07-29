const  rootController = () => {

    let index = function(req, resp, next){
        resp.json({
            done: true
        });
    };

    return {
        index
    };

};

export default rootController;
