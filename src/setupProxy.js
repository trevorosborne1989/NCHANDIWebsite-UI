const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api/NCHANDIWebsite',
    createProxyMiddleware({
      // For local hosting use the below target. For sandbox, uncomment and use the second target
      // target: 'http://localhost:8080',
      target: 'http://ec2-54-215-204-46.us-west-1.compute.amazonaws.com:8080',
      changeOrigin: true,
    })
  );
};