module.exports = function (
  /** @type {import('plop').NodePlopAPI} */
  plop
) {
  plop.setGenerator('component', {
    description: 'react component',
    prompts: [
      {
        type: 'input',
        name: 'parentPath',
        message: 'src/components/{path please}',
      },
      {
        type: 'input',
        name: 'name',
        message: 'component name please',
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'src/components/{{parentPath}}/{{name}}/index.tsx',
        templateFile: 'plop-templates/component/index.tsx.hbs',
      },
      {
        type: 'add',
        path: 'src/components/{{parentPath}}/{{name}}/{{name}}.tsx',
        templateFile: 'plop-templates/component/Component.tsx.hbs',
      },
      {
        type: 'add',
        path: 'src/components/{{parentPath}}/{{name}}/{{name}}.test.tsx',
        templateFile: 'plop-templates/component/Component.test.tsx.hbs',
      },
      {
        type: 'add',
        path: 'src/components/{{parentPath}}/{{name}}/{{name}}.graphql',
        templateFile: 'plop-templates/component/Component.graphql.hbs',
      },
    ],
  });
};
