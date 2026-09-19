/**
 * Hostinger PM2 Process Configuration (ecosystem.config.cjs)
 * Used for Hostinger VPS, Hostinger Cloud, or Hostinger Node.js Selector.
 */

module.exports = {
  apps: [
    {
      name: 'electrobolt-electro-advisor',
      script: './dist/server.cjs',
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
