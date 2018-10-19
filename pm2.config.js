module.exports = {
    apps: [{
      name: 'app',
      script: './server.js',
      cwd: '/home/app',
      interpreter: 'node',
      exec_mode: process.env.PM2_EXEC_MODE || 'cluster',
      instances: process.env.PM2_INSTANCES ? parseInt(process.env.PM2_INSTANCES) : 0,
      max_memory_restart: process.env.PM2_MAX_MEMORY_RESTART || '',
      listen_timeout: process.env.PM2_LISTEN_TIMEOUT ? parseInt( process.env.PM2_LISTEN_TIMEOUT) : 15000,
      node_args: process.env.PM2_NODE_ARGS || '',
      error_file: '/dev/null',
      out_file: '/dev/null',
      combine_logs: true,
      merge_logs: true
    }]
  };
