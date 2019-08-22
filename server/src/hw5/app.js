import express from 'express';
import { WorkerPool } from './workerPool';
const app = express();

const DEFAULT_PORT = 7000;
const PORT = process.env.PORT || DEFAULT_PORT;
const pool = new WorkerPool('./src/hw5/worker.js', 5);

app.get('/execute/:n', async (req, resp) => {
  try {   
    const n = req.params.n;
    console.log(`execute of ${n} called`);
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
