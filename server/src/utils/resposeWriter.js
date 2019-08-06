export default async function resposeWriter(action, req, resp, next) {
  try {
    const data = await action(req, resp);
    if (!data) {
      resp.status(404).json();
    } else {
      resp.status(200).json(data);
    }
  } catch (err) {
    resp.status(500).json(err);
  }

  next();
}
