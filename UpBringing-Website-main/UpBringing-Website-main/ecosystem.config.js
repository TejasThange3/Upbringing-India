/**
 * PM2 Ecosystem Configuration
 *
 * This file configures PM2 to manage your Node.js application in production.
 *
 * Usage:
 *   pm2 start ecosystem.config.js
 *   pm2 stop ecosystem.config.js
 *   pm2 restart ecosystem.config.js
 *   pm2 delete ecosystem.config.js
 */

module.exports = {
  apps: [{
    // Application name
    name: 'upbringing-app',

    // Script to run
    script: './server/index.js',

    // Node.js arguments
    node_args: '',

    // Number of instances
    instances: 1,

    // Execution mode (cluster or fork)
    exec_mode: 'fork',

    // Watch for file changes and restart (disable in production)
    watch: false,

    // Environment variables
    env: {
      NODE_ENV: 'development',
      PORT: 3001
    },

    // Production environment variables
    env_production: {
      NODE_ENV: 'production',
      PORT: 3001
    },

    // Logging
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    error_file: './logs/error.log',
    out_file: './logs/output.log',
    log_file: './logs/combined.log',

    // Advanced options
    max_memory_restart: '1G',
    autorestart: true,
    max_restarts: 10,
    min_uptime: '10s',

    // Merge logs from all instances
    merge_logs: true,

    // Time to wait before forcing a reload if app not listening
    listen_timeout: 10000,

    // Time to wait to kill the app
    kill_timeout: 5000
  }]
};
