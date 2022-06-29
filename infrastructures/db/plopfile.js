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
        path: 'src/testData/{{name}}Factory.ts',
        templateFile: 'plop-templates/testData.ts.hbs',
      },
    ],
  });
};
