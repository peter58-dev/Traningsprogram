import { FlatCompat } from '@eslint/eslintrc';
import angularPlugin from '@angular-eslint/eslint-plugin';
import angularTemplatePlugin from '@angular-eslint/eslint-plugin-template';
import tseslint from 'typescript-eslint';

const compat = new FlatCompat();

export default [
  ...compat.extends('plugin:@angular-eslint/recommended'),
  ...compat.extends('plugin:@angular-eslint/template/process-inline-templates'),

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
      '@angular-eslint/prefer-standalone': 'off', // 🔕 Stänger av standalone-varningen
    },
  },

  {
    files: ['**/*.html'],
    languageOptions: {
      parser: angularTemplatePlugin.parsers['.html'],
    },
    plugins: {
      '@angular-eslint/template': angularTemplatePlugin,
    },
    rules: {
      // Lägg till specifika HTML-regler här om du vill
      '@angular-eslint/template/no-negated-async': 'warn',
    },
  },
];
