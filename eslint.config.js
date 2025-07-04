import { FlatCompat } from '@eslint/eslintrc';
import angularPlugin from '@angular-eslint/eslint-plugin';
import angularTemplatePlugin from '@angular-eslint/eslint-plugin-template';
import tseslint from 'typescript-eslint';
import parserTemplate from '@angular-eslint/template-parser';

const compat = new FlatCompat();

export default [
  // 🧠 Rekommenderad grundkonfiguration från Angular ESLint
  ...compat.extends('plugin:@angular-eslint/recommended'),
  ...compat.extends('plugin:@angular-eslint/template/process-inline-templates'),

  // ⚙️ TypeScript-filer
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: ['./tsconfig.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      '@angular-eslint': angularPlugin,
    },
    rules: {
      quotes: ['error', 'single'],
      semi: ['error', 'always'],
      '@angular-eslint/component-class-suffix': ['error', { suffixes: ['Component', 'Page'] }],
      '@angular-eslint/component-selector': [
        'error',
        { type: 'element', prefix: 'app', style: 'kebab-case' },
      ],
      '@angular-eslint/directive-selector': [
        'error',
        { type: 'attribute', prefix: 'app', style: 'camelCase' },
      ],
      '@angular-eslint/prefer-standalone': 'off', // 🔕 Stänger av standalone-varning
    },
  },

  // 🧼 HTML-templates
  {
    files: ['**/*.html'],
    languageOptions: {
      parser: parserTemplate,
    },
    plugins: {
      '@angular-eslint/template': angularTemplatePlugin,
    },
    rules: {
      '@angular-eslint/template/banana-in-box': 'error',
      '@angular-eslint/template/no-inline-styles': 'warn',
      '@angular-eslint/template/eqeqeq': 'error',
      '@angular-eslint/template/no-negated-async': 'warn',
      '@angular-eslint/template/prefer-self-closing-tags': 'warn',

      '@angular-eslint/template/alt-text': 'warn',
      '@angular-eslint/template/label-has-associated-control': 'warn',
      '@angular-eslint/template/elements-content': 'warn',
      '@angular-eslint/template/valid-aria': 'warn',

      '@angular-eslint/template/no-call-expression': 'warn',
      '@angular-eslint/template/no-distracting-elements': 'warn',
    },
  },
];
