module.exports = {
  apps: [
    {
      name: 'wajs-api',
      script: 'index.js',
      env: {
        NODE_ENV: 'development',
        PORT: 3000
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: 3000
      }
    }
  ]
}; 