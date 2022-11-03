const { printSchemaWithDirectives } = require('@graphql-tools/utils');
const { stripIgnoredCharacters } = require('graphql');
const prettier = require('prettier');

const print = schema => `
  import gql from 'graphql-tag';
  export const typeDefs = gql\`${schema}\`;
`;

module.exports = {
  plugin: (schema, documents, config, info) => {
    return prettier.format(
      print(stripIgnoredCharacters(printSchemaWithDirectives(schema))),
      { semi: false, parser: 'babel' }
    );
  },
};
