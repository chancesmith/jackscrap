module.exports = {
  extends: ['airbnb', 'plugin:prettier/recommended', 'prettier', 'prettier/react'],
  env: {
    es6: true,
    browser: true,
    node: true,
    jest: true,
  },
  parser: 'babel-eslint',
  plugins: ['jsx-a11y', 'react', 'prettier', 'jest'],
  rules: {
    'no-plusplus': ['error', {allowForLoopAfterthoughts: true}],
    'linebreak-style': ['error', 'unix'],
    'lines-between-class-members': ['error', 'always'],
    'prettier/prettier': ['error'],
    'react/prefer-stateless-function': 0,
    'jsx-a11y/anchor-is-valid': ['error', {components: ['Link'], specialLink: ['to']}],
    'jsx-a11y/href-no-hash': 0,
    'jsx-a11y/anchor-is-valid': 0,
    'react/jsx-filename-extension': [
      1,
      {
        extensions: ['.js', '.jsx'],
      },
    ],
  },
};
