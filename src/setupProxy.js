const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api/NCHANDIWebsite',
    createProxyMiddleware({
      target: 'http://ec2-54-176-45-156.us-west-1.compute.amazonaws.com:8080',
      changeOrigin: true,
    })
  );
};