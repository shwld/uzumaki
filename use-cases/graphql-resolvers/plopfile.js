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
    ],
  });
};
