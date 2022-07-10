const fs = require('fs');

const modules = fs
  .readdirSync('src/modules')
  .map((it) => ({ name: it, value: it }));
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
        path: 'src/modules/{{module}}/mutationResolvers/index.ts',
        templateFile: 'plop-templates/module/emptyResolver.ts.hbs',
      },
      {
        type: 'add',
        path: 'src/modules/{{module}}/queryResolvers/index.ts',
        templateFile: 'plop-templates/module/emptyResolver.ts.hbs',
      },
      {
        type: 'add',
        path: 'src/modules/{{module}}/objectResolvers/index.ts',
        templateFile: 'plop-templates/module/emptyResolver.ts.hbs',
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
        path: 'src/modules/{{module}}/queryResolvers/{{queryName}}/index.ts',
        templateFile: 'plop-templates/query/index.ts.hbs',
      },
      {
        type: 'add',
        path: 'src/modules/{{module}}/queryResolvers/{{queryName}}/query.sdl.graphql',
        templateFile: 'plop-templates/query/query.sdl.graphql.hbs',
      },
      {
        type: 'append',
        path: 'src/modules/{{module}}/queryResolvers/index.ts',
        template: "export * from './{{queryName}}';",
      },
      {
        type: 'append',
        path: 'src/middlewares/shield/index.ts',
        pattern: /Query: {/,
        template: '    {{queryName}}: isAuthenticated,',
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
        path: 'src/modules/{{module}}/mutationResolvers/{{objName}}.{{action}}/index.ts',
        templateFile: 'plop-templates/mutation/index.ts.hbs',
      },
      {
        type: 'add',
        path: 'src/modules/{{module}}/mutationResolvers/{{objName}}.{{action}}/index.test.ts',
        templateFile: 'plop-templates/mutation/index.test.ts.hbs',
      },
      {
        type: 'add',
        path: 'src/modules/{{module}}/mutationResolvers/{{objName}}.{{action}}/mutation.sdl.graphql',
        templateFile: 'plop-templates/mutation/mutation.sdl.graphql.hbs',
      },
      {
        type: 'add',
        path: 'src/modules/{{module}}/mutationResolvers/{{objName}}.{{action}}/validation.ts',
        templateFile: 'plop-templates/mutation/validation.ts.hbs',
      },
      {
        type: 'append',
        path: 'src/modules/{{module}}/mutationResolvers/index.ts',
        template: "export * from './{{objName}}.{{action}}';",
      },
      {
        type: 'append',
        path: 'src/middlewares/shield/index.ts',
        pattern: /Mutation: {/,
        template: '    {{action}}{{pascalCase objName}}: isAuthenticated,',
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
        path: 'src/modules/{{module}}/objectResolvers/{{objName}}/index.ts',
        templateFile: 'plop-templates/object/index.ts.hbs',
      },
      {
        type: 'add',
        path: 'src/modules/{{module}}/objectResolvers/{{objName}}/object.sdl.graphql',
        templateFile: 'plop-templates/object/object.sdl.graphql.hbs',
      },
      {
        type: 'append',
        path: 'src/modules/{{module}}/objectResolvers/index.ts',
        template: "export * from './{{objName}}';",
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
