const withTM = require('next-transpile-modules')([
  'core-domain',
  'db',
  'graphql-resolvers',
  'ui',
]);

module.exports = withTM({
  // reactStrictMode: true,
  reactStrictMode: false, // for react-beautiful-dnd https://github.com/atlassian/react-beautiful-dnd/issues/2407
  compiler: {
    emotion: true,
  },
});
