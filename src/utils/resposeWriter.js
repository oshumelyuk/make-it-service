export default function resposeWriter(action, req, resp, next) {
  var data = action(req, resp);
  resp.status(200).json({
    success: true,
    data: data
  });
  next();
}
