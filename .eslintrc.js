module.exports = {
  extends: [
    'airbnb',
    'plugin:prettier/recommended',
    'prettier/react',
    'plugin:compat/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    jsx: true,
    useJSXTextNode: true,
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint',
    'react',
    'import',
  ],
  env: {
    browser: true,
    commonjs: true,
    node: true,
    es6: true,
    mocha: true,
  },
  rules: {
    // @typescript-eslint/no-unused-vars
    'no-unused-vars': 'off',
    'no-restricted-syntax': 'off', // В for...of циклах ничего плохого нет
    'react/destructuring-assignment': 'off', // Правило норм, но заставляет дестрактурить даже не один параметр.
    'spaced-comment': ['error', 'always', { 'markers': ['/'] }], /// разрешаем ts-require directive
    'import/prefer-default-export': 'off', // @grape: https://humanwhocodes.com/blog/2019/01/stop-using-default-exports-javascript-module/
    'comma-dangle': [2, 'always-multiline'],
    'valid-jsdoc': [1, {
      prefer: {
        arg: 'param',
        argument: 'param',
        class: 'constructor',
        return: 'returns',
        virtual: 'abstract',
      },
      preferType: {
        boolean: 'Boolean',
        number: 'Number',
        string: 'String',
        object: 'Object',
        Null: 'null',
        Undefined: 'undefined',
      },
      requireReturn: false,
      requireParamType: false,
      requireReturnType: false,
      requireParamDescription: false,
      requireReturnDescription: false,
    }],
    camelcase: [1, { properties: 'never' }],

    'prettier/prettier': 'error',

    // https://github.com/yannickcr/eslint-plugin-react/tree/master/docs/rules
    'react/prop-types': 0, // Отключаем, так как в ts интерфейсах propTypes не нужен
    'react/void-dom-elements-no-children': 'error',
    'react/jsx-filename-extension': ['error', { extensions: ['.tsx', '.jsx'] }],
    'react/jsx-props-no-spreading': 'off',

    // https://github.com/bradzacher/eslint-plugin-typescript#supported-rules
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/no-empty-interface': 'error',

    // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/order.md
    'import/order': ['error', {
      groups: [['builtin', 'external'], 'internal', 'parent', 'sibling', 'index'],
      'newlines-between': 'always'
    }],
    'import/no-extraneous-dependencies': 'off',
    'import/no-unresolved': 'off'
  },
  overrides: [
    {
      files: ['renderer.js'],
      env: {
        node: true,
      },
      rules: {
        'no-param-reassign': 0,
        'global-require': 0,
      }
    },
    {
      files: ['*.tsx?'],
      env: {
        browser: true,
      },
    },
    {
      files: ['*.test.tsx?'],
      env: {
        browser: true,
        mocha: true,
      },
    },
    {
      files: ['*.hermione.js'],
      rules: {
        'func-names': 0,
      }
    }
  ]
};
