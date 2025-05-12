/* eslint-disable @typescript-eslint/no-explicit-any */
import cluster from 'cluster';
import http from 'http';
import os from 'os';
import { users } from './index';

const numCPUs = os.availableParallelism
  ? os.availableParallelism() - 1
  : os.cpus().length - 1;
const BASE_PORT = parseInt(process.env.PORT || '4000');

if (cluster.isPrimary) {
  console.log(`Primary ${process.pid} is running`);
  let sharedUsers: any[] = users;
  let currentWorkerIndex = 0; 

  const server = http.createServer((req, res) => {
    const workerPort = BASE_PORT + (currentWorkerIndex % numCPUs) + 1;
    currentWorkerIndex = (currentWorkerIndex + 1) % numCPUs;

    const proxyReq = http.request(
      {
        host: 'localhost',
        port: workerPort,
        path: req.url,
        method: req.method,
        headers: req.headers,
      },
      (proxyRes) => {
        res.writeHead(proxyRes.statusCode || 200, proxyRes.headers);
        proxyRes.pipe(res);
      }
    );

    req.pipe(proxyReq);
  });

  server.listen(BASE_PORT, () => {
    console.log(`Load balancer running on port ${BASE_PORT}`);
  });

  for (let i = 0; i < numCPUs; i++) {
    const worker = cluster.fork({ WORKER_PORT: BASE_PORT + i + 1 });

    worker.on('message', (msg) => {
      if (msg.type === 'updateUsers') {
        sharedUsers = msg.users;
        for (const id in cluster.workers) {
          cluster.workers[id]?.send({ type: 'syncUsers', users: sharedUsers });
        }
      }
    });
  }
} else {
  process.on('message', (msg) => {
    if (msg.type === 'syncUsers') {
      users.length = 0;
      users.push(...msg.users);
    }
  });

  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { server } = require('./index');
  server.listen(process.env.WORKER_PORT, () => {
    console.log(
      `Worker ${process.pid} running on port ${process.env.WORKER_PORT}`
    );
  });

  const originalPush = users.push;
  users.push = function (...items: any[]) {
    const result = originalPush.apply(this, items);
    process.send?.({ type: 'updateUsers', users });
    return result;
  };

  const originalSplice = users.splice;
  users.splice = function (
    start: number,
    deleteCount: number,
    ...items: any[]
  ) {
    const result = originalSplice.apply(this, [start, deleteCount, ...items]);
    process.send?.({ type: 'updateUsers', users });
    return result;
  };
}
