module.exports = {
  apps: [
    {
      name: 'tickets-api',
      script: 'npm',
      args: 'start',
      instances: 1,
      autorestart: true,
      watch: true,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
        DATABASE_URL: 'file:./data.db',
        PORT: 3011,
      },
    },
  ],
};
