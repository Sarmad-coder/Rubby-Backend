module.exports = {
  apps: [
    {
      name: 'ruuby-node',
      script: './bin/www',
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
};

// This file is used by pm2 in server
