const clusterize = require('./clusterize'),
  app = require('./app');

clusterize((cluster) => {
  app.start(() => {
    console.log(`${cluster.worker.id} running on port ${app.get('port')}`);
  });
});
