const { createProxyMiddleware } = require('http-proxy-middleware');

// Use this service URL for local
// const serviceURL = 'http://localhost:8080';

// Use this service URL for production
const serviceURL = 'https://df7g4zitg1.execute-api.us-west-1.amazonaws.com/nchandi-api';

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: serviceURL,
      changeOrigin: true,
    })
  );
};