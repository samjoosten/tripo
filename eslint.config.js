// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');
const eslintPluginPrettierRecommended = require('eslint-plugin-prettier/recommended');
const js = require('@eslint/js');
const tseslint = require('typescript-eslint');
const prettier = require('eslint-plugin-prettier');
const pluginImport = require('eslint-plugin-import');
const react = require('eslint-plugin-react');
const reactHooks = require('eslint-plugin-react-hooks');
const reactNative = require('eslint-plugin-react-native');
const preferArrow = require('eslint-plugin-prefer-arrow');
const reactPreferFunctionComponent = require('eslint-plugin-react-prefer-function-component');

module.exports = defineConfig([
  // expoConfig,
  // eslintPluginPrettierRecommended,
  {
    ignores: [
      'node_modules/',
      'build/',
      'dist/',
      '.expo/',
      '.expo-shared/',
      '*.log',
      '*.log.*',
      '.DS_Store',
      'Thumbs.db',
      '.vscode/',
      '.idea/',
      '.env',
      '.env.*',
      'test/',
      'e2e/',
      'scripts/',
      '*.config.js',
      '*.config.ts',
      'assets/',
      'benchmarks/',
      'migrations/',
      '*.podspec',
      'plugins/',
      '@types/',
      '!.rnstorybook'
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: './tsconfig.json',
        sourceType: 'module',
        ecmaVersion: 'latest',
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
  },
  {
    plugins: {
      prettier: {
        rules: prettier.default,
      },
      import: pluginImport,
      react: react,
      'react-hooks': reactHooks,
      'react-native': reactNative,
      'prefer-arrow': preferArrow,
      'react-prefer-function-component': reactPreferFunctionComponent,
    },
    settings: {
      react: {
        version: 'detect',
      },
      'import/parsers': {
        '@typescript-eslint/parser': ['.ts', '.tsx'],
      },
      'import/resolver': {
        node: {
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },
        typescript: {
          project: './tsconfig.json',
        },
      },
    },
    rules: {
      // TypeScript Rules
      '@typescript-eslint/array-type': ['error', { default: 'generic' }],
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-inferrable-types': 'warn',
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/no-misused-promises': [
        'error',
        {
          checksVoidReturn: false,
        },
      ],

      // General JavaScript Rules
      'padding-line-between-statements': [
        'error',
        { blankLine: 'always', prev: 'import', next: '*' },
        { blankLine: 'any', prev: 'import', next: 'import' },
      ],
      complexity: ['warn', 15],
      'no-nested-ternary': 'error',
      'arrow-spacing': 'error',
      'default-param-last': 'error',
      'no-await-in-loop': 'error',
      'no-confusing-arrow': 'error',
      'no-console': 'error',
      'no-duplicate-case': 'error',
      'no-extra-boolean-cast': 'error',
      'no-extra-semi': 'error',
      'no-lonely-if': 'error',
      'no-multi-spaces': 'error',
      'no-param-reassign': 'error',
      'no-unneeded-ternary': 'error',
      'no-useless-return': 'error',
      'prefer-arrow-callback': 'error',
      'prefer-destructuring': 'error',
      'prefer-spread': 'error',
      'prefer-template': 'error',
      'prefer-arrow/prefer-arrow-functions': [
        'error',
        {
          disallowPrototype: true,
          classPropertiesAllowed: false,
        },
      ],
      quotes: ['error', 'single', { allowTemplateLiterals: true }],
      semi: ['error', 'always'],
      'max-lines': ['warn', { max: 350, skipBlankLines: true, skipComments: true }],
      'import/order': [
        'error',
        {
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
          'newlines-between': 'always',
        },
      ],
      'import/no-unresolved': 'error',
      'import/namespace': 'off',

      // React Rules
      'react/display-name': 'off',
      'react/jsx-first-prop-new-line': ['error', 'multiline-multiprop'],
      'react/jsx-indent-props': 'off',
      'react/jsx-max-props-per-line': ['error', { maximum: 3, when: 'multiline' }],
      'react/no-unstable-nested-components': 'error',
      'react/prop-types': 'off',
      'react/jsx-no-leaked-render': ['error', { validStrategies: ['coerce', 'ternary'] }],
      'react/no-array-index-key': 'error',
      'react/react-in-jsx-scope': 'off',

      // React Hooks
      'react-hooks/exhaustive-deps': 'warn',
      'react-hooks/rules-of-hooks': 'error',

      // React Native
      'react-native/no-inline-styles': 'off',
      'react-native/no-unused-styles': 'error',
      'react-native/split-platform-components': 'error',
      'react-native/no-raw-text': ['error', { skip: ['ThemedText'] }],

      // Prettier
      'prettier/prettier': 0,
    },
  }
]);