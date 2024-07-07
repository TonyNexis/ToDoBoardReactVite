module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: '18.2' } },
  plugins: ['react-refresh', 'import'],
  rules: {
    'react/jsx-no-target-blank': 'off',
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'import/order': [
          'error',
          {
            groups: [
              'builtin',    // Node "builtin" modules
              'external',   // External modules (npm)
              'internal',   // Internal modules
              'parent',     // Parent directories
              'sibling',    // Sibling directories
              'index',      // Index files
              'object',     // Object imports
              'type'        // Type imports
            ],
            'newlines-between': 'always',  // Add new lines between groups
            alphabetize: { order: 'asc', caseInsensitive: true }, // Alphabetize within groups
          }
        ]
      },
};