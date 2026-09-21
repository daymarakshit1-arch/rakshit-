/**
 * Hostinger PM2 Process Configuration (ecosystem.config.cjs)
 * Used for Hostinger VPS, Hostinger Cloud, or Hostinger Node.js Selector.
 */

const fs = require('fs');

const scriptPath = fs.existsSync('./server.js')
  ? './server.js'
  : (fs.existsSync('./dist/server.cjs') ? './dist/server.cjs' : './server.cjs');

module.exports = {
  apps: [
    {
      name: 'electrobolt-electro-advisor',
      script: scriptPath,
      instances: 'max',
      exec_mode: 'cluster',
      autorestart: true,
      watch: false,
      max_memory_restart: '500M',
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: 3000,
      },
    },
  ],
};
