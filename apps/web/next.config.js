const withTM = require('next-transpile-modules')(['ui', 'graphql-resolvers']);

module.exports = withTM({
  reactStrictMode: true,
});
