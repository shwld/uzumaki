module.exports = function (
  /** @type {import('plop').NodePlopAPI} */
  plop
) {
  plop.setGenerator('repository', {
    description: 'repository',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'aggregation name please',
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'src/repositories/{{kebabCase name}}/{{kebabCase name}}-create.ts',
        templateFile: 'plop-templates/repository/create.ts.hbs',
      },
      {
        type: 'add',
        path: 'src/repositories/{{kebabCase name}}/{{kebabCase name}}-update.ts',
        templateFile: 'plop-templates/repository/update.ts.hbs',
      },
      {
        type: 'add',
        path: 'src/repositories/{{kebabCase name}}/{{kebabCase name}}-destroy.ts',
        templateFile: 'plop-templates/repository/destroy.ts.hbs',
      },
      {
        type: 'add',
        path: 'src/repositories/{{kebabCase name}}/{{kebabCase name}}-record.ts',
        templateFile: 'plop-templates/repository/record.ts.hbs',
      },
      {
        type: 'add',
        path: 'src/repositories/{{kebabCase name}}/{{kebabCase name}}-find-by.ts',
        templateFile: 'plop-templates/repository/find-by.ts.hbs',
      },
      {
        type: 'add',
        path: 'src/repositories/{{kebabCase name}}/{{kebabCase name}}-find-many.ts',
        templateFile: 'plop-templates/repository/find-many.ts.hbs',
      },
      {
        type: 'add',
        path: 'src/repositories/{{kebabCase name}}/index.ts',
        templateFile: 'plop-templates/repository/index.ts.hbs',
      },
      {
        type: 'append',
        path: 'src/index.ts',
        pattern: /import.*[;]/,
        template:
          "import { {{pascalCase name}}Repository } from './repositories/{{kebabCase name}}';",
      },
      {
        type: 'append',
        path: 'src/index.ts',
        pattern: /export const db: Aggregates = {/,
        template: '  {{camelCase name}}: {{pascalCase name}}Repository,',
      },
    ],
  });
  plop.setGenerator('testdata', {
    description: 'testdata',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'table name please',
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'src/test-data/{{kebabCase name}}-factory.ts',
        templateFile: 'plop-templates/test-data.ts.hbs',
      },
      {
        type: 'append',
        path: 'src/test-data/index.ts',
        template: "export * from './{{kebabCase name}}-factory';",
      },
    ],
  });
};
