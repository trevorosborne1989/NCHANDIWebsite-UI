const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      // For local hosting use the below target. For production, uncomment and use the second target
      // target: 'http://localhost:8080',
      // target: 'http://ec2-13-57-33-74.us-west-1.compute.amazonaws.com:8080',
      target: 'https://df7g4zitg1.execute-api.us-west-1.amazonaws.com/nchandi-api',
      changeOrigin: true,
    })
  );
};