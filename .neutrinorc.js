module.exports = {
  use: [
    ['@neutrinojs/airbnb',
      {
        eslint: {
          'rules': {
            'import/extensions': 0,
            'react/prop-types': 'off',
            'no-underscore-dangle': 'off',
            'object-shorthand': 'off',
            'func-names': 'off',
            'no-param-reassign': 'off',
            'class-methods-use-this': 'warn',
            'no-console': 'off',
            'no-plusplus': 'off',
            'no-unused-vars': 'warn',
            'prefer-destructuring': 'off',
            'prefer-template': 'warn',
            'max-len': ['warn', {'code': 120}]
          }
        }
      }
    ],
    '@neutrinojs/react-components',
    ['@neutrinojs/jest', {
      testRegex: 'src/.*(_test|_spec|\\.test|\\.spec)\\.(js|jsx|vue|ts|tsx|mjs)$',
      'setupFiles': ['raf/polyfill']
    }],
  ]
};
