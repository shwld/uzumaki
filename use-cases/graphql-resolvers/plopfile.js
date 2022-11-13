const fs = require('fs');

const modules = fs
  .readdirSync('src/modules')
  .map(it => ({ name: it, value: it }));
const modulePrompt = {
  type: 'list',
  name: 'module',
  message: 'module name please',
  choices: modules,
};

module.exports = function (
  /** @type {import('plop').NodePlopAPI} */
  plop
) {
  plop.setGenerator('module', {
    description: 'graphql module',
    prompts: [
      {
        type: 'input',
        name: 'module',
        message: 'module name please',
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'src/modules/{{module}}/mutation-resolvers/index.ts',
        templateFile: 'plop-templates/module/empty-resolver.ts.hbs',
      },
      // {
      //   type: 'add',
      //   path: 'src/modules/{{module}}/query-resolvers/index.ts',
      //   templateFile: 'plop-templates/module/empty-resolver.ts.hbs',
      // },
      {
        type: 'add',
        path: 'src/modules/{{module}}/object-resolvers/index.ts',
        templateFile: 'plop-templates/module/empty-resolver.ts.hbs',
      },
      {
        type: 'add',
        path: 'src/modules/{{module}}/index.ts',
        templateFile: 'plop-templates/module/index.ts.hbs',
      },
      {
        type: 'append',
        path: 'src/index.ts',
        pattern: /import { .*Module } from '.\/modules.*;/,
        template: "import { {{module}}Module } from './modules/{{module}}';",
      },
      {
        type: 'append',
        path: 'src/index.ts',
        pattern: /resolvers: merge.all<Resolvers<GraphqlServerContext>>\(\[/,
        template: '    {{module}}Module.resolvers,',
      },
    ],
  });
  plop.setGenerator('query', {
    description: 'graphql query',
    prompts: [
      modulePrompt,
      {
        type: 'input',
        name: 'queryName',
        message: 'query name please',
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'src/modules/{{module}}/query-resolvers/{{kebabCase queryName}}/{{kebabCase queryName}}.ts',
        templateFile: 'plop-templates/query/query.ts.hbs',
      },
      {
        type: 'add',
        path: 'src/modules/{{module}}/query-resolvers/{{kebabCase queryName}}/{{kebabCase queryName}}.sdl.graphql',
        templateFile: 'plop-templates/query/query.sdl.graphql.hbs',
      },
      {
        type: 'add',
        path: 'src/modules/{{module}}/query-resolvers/{{kebabCase queryName}}/index.ts',
        templateFile: 'plop-templates/query/index.ts.hbs',
      },
      {
        type: 'append',
        path: 'src/modules/{{module}}/query-resolvers/index.ts',
        template: "export * from './{{kebabCase queryName}}';",
      },
      {
        type: 'append',
        path: 'src/middlewares/shield/index.ts',
        pattern: /Query: {/,
        template: '    {{pascalCase queryName}}: isAuthenticated,',
      },
    ],
  });
  plop.setGenerator('mutation', {
    description: 'graphql mutation',
    prompts: [
      modulePrompt,
      {
        type: 'input',
        name: 'objName',
        message: 'object name please',
      },
      {
        type: 'input',
        name: 'action',
        message: 'mutation action name please',
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'src/modules/{{module}}/mutation-resolvers/{{kebabCase objName}}.{{kebabCase action}}/{{kebabCase action}}{{kebabCase objName}}.ts',
        templateFile: 'plop-templates/mutation/mutation.ts.hbs',
      },
      {
        type: 'add',
        path: 'src/modules/{{module}}/mutation-resolvers/{{kebabCase objName}}.{{kebabCase action}}/{{kebabCase action}}{{kebabCase objName}}.test.ts',
        templateFile: 'plop-templates/mutation/mutation.test.ts.hbs',
      },
      {
        type: 'add',
        path: 'src/modules/{{module}}/mutation-resolvers/{{kebabCase objName}}.{{kebabCase action}}/{{kebabCase action}}{{kebabCase objName}}.sdl.graphql',
        templateFile: 'plop-templates/mutation/mutation.sdl.graphql.hbs',
      },
      {
        type: 'add',
        path: 'src/modules/{{module}}/mutation-resolvers/{{kebabCase objName}}.{{kebabCase action}}/{{kebabCase action}}{{kebabCase objName}}-validation.ts',
        templateFile: 'plop-templates/mutation/validation.ts.hbs',
      },
      {
        type: 'add',
        path: 'src/modules/{{module}}/mutation-resolvers/{{kebabCase objName}}.{{kebabCase action}}/index.ts',
        templateFile: 'plop-templates/mutation/index.ts.hbs',
      },
      {
        type: 'append',
        path: 'src/modules/{{module}}/mutation-resolvers/index.ts',
        template:
          "export * from './{{kebabCase objName}}.{{kebabCase action}}';",
      },
      {
        type: 'append',
        path: 'src/middlewares/shield/index.ts',
        pattern: /Mutation: {/,
        template:
          '    {{pascalCase action}}{{pascalCase objName}}: isAuthenticated,',
      },
    ],
  });
  plop.setGenerator('object', {
    description: 'graphql object',
    prompts: [
      modulePrompt,
      {
        type: 'input',
        name: 'objName',
        message: 'object name please',
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'src/modules/{{module}}/object-resolvers/{{kebabCase objName}}/{{kebabCase objName}}.ts',
        templateFile: 'plop-templates/object/object.ts.hbs',
      },
      {
        type: 'add',
        path: 'src/modules/{{module}}/object-resolvers/{{kebabCase objName}}/{{kebabCase objName}}.sdl.graphql',
        templateFile: 'plop-templates/object/object.sdl.graphql.hbs',
      },
      {
        type: 'add',
        path: 'src/modules/{{module}}/object-resolvers/{{kebabCase objName}}/index.ts',
        templateFile: 'plop-templates/object/index.ts.hbs',
      },
      {
        type: 'append',
        path: 'src/modules/{{module}}/object-resolvers/index.ts',
        template: "export * from './{{kebabCase objName}}';",
      },
      {
        type: 'append',
        path: 'codegen.yml',
        pattern: /mappers:/,
        template:
          '        {{pascalCase objName}}: core-domain#{{pascalCase objName}}Entity',
      },
      {
        type: 'append',
        path: 'src/middlewares/shield/index.ts',
        pattern: /const permission = {/,
        template: '  {{pascalCase objName}}: isAuthenticated,',
      },
    ],
  });
};
