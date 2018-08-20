const withCSS = require('@zeit/next-css');

module.exports = withCSS({
  exportPathMap() {
    return {
      '/': { page: '/' },
      '/auth/callback': { page: '/auth/callback' },
    };
  },
});
