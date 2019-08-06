const rootController = () => {
  let index = function(req, resp, next) {
    resp.json({
      done: true
    });
    next();
  };

  return {
    index
  };
};

export default rootController;
