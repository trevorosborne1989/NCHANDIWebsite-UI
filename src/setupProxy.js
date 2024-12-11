const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api/NCHANDIWebsite',
    createProxyMiddleware({
      target: 'http://ec2-13-57-33-74.us-west-1.compute.amazonaws.com:8080',
      changeOrigin: true,
    })
  );
};