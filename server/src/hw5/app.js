import express from 'express';
import workerPool, { WorkerPool } from '../workerPool';
const app = express();

const DEFAULT_PORT = 7000;
const PORT = process.env.PORT || DEFAULT_PORT;
const pool = new WorkerPool('./factorial.js', 50);

app.post('/execute/:n', async (req, resp) => {
  try {
    const n = req.params.n;
    const res = await pool.run(n);
    resp.status(200).json({
      result: res
    });
  } catch (e) {
    resp.status(400).json({
      message: e.message
    });
  }
});

app.listen(PORT, () => console.log(`Application listening on port ${PORT}`));
