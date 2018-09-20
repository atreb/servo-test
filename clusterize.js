const cluster  = require('cluster'),
  os = require('os'),
  workers = {},
  count = os.cpus().length;

function spawn(i) {
  const worker = cluster.fork();
  workers[worker.id] = worker;

  if (i === 1) {
    process._debugPort = 5858 + worker.id;
  }

  return worker;
}

module.exports = function clusterer(serve) {
  if (cluster.isMaster) {
    for (let i = 0; i < count; i++) {
      spawn(i);
    }

    cluster.on('exit', (worker) => {
      console.log(`worker ${worker.id} died. spawning a new process...`);
      delete workers[worker.id];
      spawn(0);
    });
  } else {
    serve(cluster);
  }
};
