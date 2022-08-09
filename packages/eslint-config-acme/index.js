module.exports = {
  extends: ['next', 'prettier'],
  ignorePatterns: [
    '*.hbs',
    '*.json',
    '*.log',
    '*.sql',
    '*.graphql',
    '*.prisma',
    '*.toml',
    '*.yml',
  ],
  rules: {
    '@next/next/no-html-link-for-pages': 'off',
    'react/jsx-key': 'off',
  },
};
