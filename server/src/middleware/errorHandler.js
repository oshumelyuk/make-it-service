function handleError404(req, resp, next) {
  // if we get here means that no routes are found
  resp.status(404).end("404: page not found");
}

function handleError500(error, req, resp, next) {
  // Any error request to this server will get here
  resp.status(500).json({
    success: false,
    message: error.message,
    requestUrl: req.originalUrl,
    requestBody: JSON.stringify(req.body)
  });
}

export { handleError404, handleError500 };
