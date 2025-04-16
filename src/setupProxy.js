const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api/NCHANDIWebsite',
    createProxyMiddleware({
      // For local hosting use the below target. For production, uncomment and use the second target
      // target: 'http://localhost:8080',
      target: 'https://ec2-13-57-33-74.us-west-1.compute.amazonaws.com:8080',
      changeOrigin: true,
    })
  );
};