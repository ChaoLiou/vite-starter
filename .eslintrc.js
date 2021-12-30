module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:vue/vue3-recommended',
    'plugin:import/typescript',
    'airbnb-base',
    'plugin:jest/recommended',
  ],
  plugins: ['@typescript-eslint', 'prettier'],
  parserOptions: {
    ecmaVersion: 2021,
    parser: '@typescript-eslint/parser',
  },
  ignorePatterns: ['tests/e2e/**/*.ts'],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    indent: ['off', 2],
    'linebreak-style': 0,
    'implicit-arrow-linebreak': 'off',
    'operator-linebreak': 'off',
    'function-paren-newline': 'off',
    'import/no-unresolved': 'off',
    'import/no-extraneous-dependencies': 'off',
    'import/extensions': 'off',
    'object-curly-newline': 'off',
    'vue/html-self-closing': 'off',
    'vue/singleline-html-element-content-newline': 'off',
    'newline-per-chained-call': 'off',
    'vue/no-v-html': 'off',
    'no-confusing-arrow': 'off',
    'vue/max-attributes-per-line': 'off',
  },
  globals: {
    defineProps: 'readonly',
    defineEmits: 'readonly',
    defineExpose: 'readonly',
    withDefaults: 'readonly',
    processEnv: 'readable',
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
};
