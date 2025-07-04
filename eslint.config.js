import { FlatCompat } from '@eslint/eslintrc';
import angularPlugin from '@angular-eslint/eslint-plugin';
import angularTemplatePlugin from '@angular-eslint/eslint-plugin-template';
import tseslint from 'typescript-eslint';

const compat = new FlatCompat();

export default [
  ...compat.extends('plugin:@angular-eslint/recommended'),
  ...compat.extends('plugin:@angular-eslint/template/process-inline-templates'),
  {
    files: ['*.ts'],
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
        {
          type: 'element',
          prefix: 'app',
          style: 'kebab-case',
        },
      ],
      '@angular-eslint/directive-selector': [
        'error',
        {
          type: 'attribute',
          prefix: 'app',
          style: 'camelCase',
        },
      ],
    },
  },
  {
    files: ['*.html'],
    plugins: {
      '@angular-eslint/template': angularTemplatePlugin,
    },
    rules: {
      // Här kan du lägga till regler för HTML
    },
  },
];
