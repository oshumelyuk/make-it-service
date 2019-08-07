export default async function resposeWriter(action, req, resp, next) {
  try {
    const data = await action(req, resp);
    if (!data) {
      resp.status(404).json();
    } else {
      resp.status(200).json(data);
    }
    next();
  } catch (err) {
    next(err);
  }
}
