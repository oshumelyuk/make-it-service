import { handleError404, handleError500 } from "../middleware/errorHandler";

export default async function resposeWriter(action, req, resp, next) {
  try {
    const data = await action(req, resp);
    if (!data) {
      handleError404(req, resp, next);
      return;
    }
    resp.status(200).json(data);
    next();
  } catch (err) {
    handleError500({message: err}, req, resp, next);
  }
}
