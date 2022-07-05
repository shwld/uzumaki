const withTM = require('next-transpile-modules')([
  'core-domain',
  'db',
  'graphql-resolvers',
  'ui',
]);

module.exports = withTM({
  reactStrictMode: true,
  compiler: {
    emotion: true,
  },
});
