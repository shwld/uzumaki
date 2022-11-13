const fs = require('fs');

const models = fs
  .readdirSync('src/models')
  .filter(name => name !== 'shared' && !/\.ts/.test(name))
  .map(it => ({ name: it, value: it }));

module.exports = function (
  /** @type {import('plop').NodePlopAPI} */
  plop
) {
  plop.setGenerator('aggregate', {
    description: 'aggregate',
    prompts: [
      {
        type: 'list',
        name: 'name',
        message: 'model name please',
        choices: models,
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'src/aggregates/repository-interfaces/{{kebabCase name}}-repository.ts',
        templateFile: 'plop-templates/aggregates/repository.ts.hbs',
      },
      {
        type: 'append',
        path: 'src/aggregates/repository-interfaces/index.ts',
        pattern: /import.*[;]/,
        template:
          "import type { {{pascalCase name}}Repository } from './{{kebabCase name}}-repository';",
      },
      {
        type: 'append',
        path: 'src/aggregates/repository-interfaces/index.ts',
        pattern: /export interface Aggregates {/,
        template: '  {{camelCase name}}: {{pascalCase name}}Repository;',
      },
    ],
  });
  plop.setGenerator('model', {
    description: 'model',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'model name please',
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'src/models/{{kebabCase name}}/mutations/build-{{kebabCase name}}.ts',
        templateFile: 'plop-templates/models/mutations/build.ts.hbs',
      },
      {
        type: 'add',
        path: 'src/models/{{kebabCase name}}/mutations/build-{{kebabCase name}}.test.ts',
        templateFile: 'plop-templates/models/mutations/build.test.ts.hbs',
      },
      {
        type: 'add',
        path: 'src/models/{{kebabCase name}}/mutations/edit-{{kebabCase name}}.ts',
        templateFile: 'plop-templates/models/mutations/edit.ts.hbs',
      },
      {
        type: 'add',
        path: 'src/models/{{kebabCase name}}/mutations/edit-{{kebabCase name}}.test.ts',
        templateFile: 'plop-templates/models/mutations/edit.test.ts.hbs',
      },
      {
        type: 'add',
        path: 'src/models/{{kebabCase name}}/mutations/remove-{{kebabCase name}}.ts',
        templateFile: 'plop-templates/models/mutations/remove.ts.hbs',
      },
      {
        type: 'add',
        path: 'src/models/{{kebabCase name}}/mutations/remove-{{kebabCase name}}.test.ts',
        templateFile: 'plop-templates/models/mutations/remove.test.ts.hbs',
      },
      {
        type: 'add',
        path: 'src/models/{{kebabCase name}}/mutations/index.ts',
        templateFile: 'plop-templates/models/mutations/index.ts.hbs',
      },
      {
        type: 'add',
        path: 'src/models/{{kebabCase name}}/{{kebabCase name}}-entity.ts',
        templateFile: 'plop-templates/models/entity.ts.hbs',
      },
      {
        type: 'add',
        path: 'src/models/{{kebabCase name}}/index.ts',
        templateFile: 'plop-templates/models/index.ts.hbs',
      },
      {
        type: 'add',
        path: 'src/models/{{kebabCase name}}/{{kebabCase name}}-interfaces.ts',
        templateFile: 'plop-templates/models/interfaces.ts.hbs',
      },
      {
        type: 'add',
        path: 'src/models/{{kebabCase name}}/{{kebabCase name}}-policies.ts',
        templateFile: 'plop-templates/models/policies.ts.hbs',
      },
      {
        type: 'add',
        path: 'src/models/{{kebabCase name}}/{{kebabCase name}}-validator.ts',
        templateFile: 'plop-templates/models/validator.ts.hbs',
      },
      {
        type: 'append',
        path: 'src/models/index.ts',
        pattern: /'.\/.*;/,
        template: "export * from './{{kebabCase name}}';",
      },
    ],
  });
};
