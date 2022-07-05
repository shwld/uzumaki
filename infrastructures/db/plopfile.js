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
        path: 'src/repositories/{{name}}Repository.ts',
        templateFile: 'plop-templates/repository.ts.hbs',
      },
      {
        type: 'append',
        path: 'src/index.ts',
        pattern: /import.*[;]/,
        template:
          "import { {{name}}Repository } from './repositories/{{name}}Repository';",
      },
      {
        type: 'append',
        path: 'src/index.ts',
        pattern: /export const db: Aggregates = {/,
        template: '  {{name}}: {{name}}Repository,',
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
  });
};
