import nextPlugin from '@next/eslint-plugin-next';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import react from 'eslint-plugin-react';

export default [
  {
    files: ['**/*.{js,ts,jsx,tsx}'],
    languageOptions: { parser: tsParser, globals: { React: 'writable' } },
    plugins: { '@next/next': nextPlugin, '@typescript-eslint': tsPlugin, react },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...tsPlugin.configs.recommended.rules,
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
      'react/prop-types': 'off',
    },
    settings: { react: { version: 'detect' } },
  },
  { ignores: ['**/.next/', '**/build/', '**/dist/'] },
];
