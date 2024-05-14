// pm2 start pm2.conf.js (ecosystem.config.js)
module.exports = {
  apps: [
    {
      name: 'tickets-api',
      script: 'npm', // Change this to the entry point of your application (e.g., server>
      args: 'start',
      instances: 1, // Automatically scale based on available CPU cores
      autorestart: true, // Restart the app if it crashes
      watch: true, // Enable file watch for automatic restart on file changes
      max_memory_restart: '1G', // Restart the app if it exceeds 1GB memory usage
      env: {
        NODE_ENV: 'production', // Set the environment to production
        PORT: 3011, // Set the port to 3000
      },
    },
  ],
};
