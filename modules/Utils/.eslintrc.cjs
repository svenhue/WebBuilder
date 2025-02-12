module.exports = {
    parserOptions: {
        sourceType: 'module',
        ecmaVersion: 2020,
        parser: require.resolve('@typescript-eslint/parser'),
        extraFileExtensions: [ '.vue' ],
      },
     // Rules order is important, please avoid shuffling them
     extends: [
        // Base ESLint recommended rules
        // 'eslint:recommended',
    
        // https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin#usage
        // ESLint typescript rules
        'plugin:@typescript-eslint/recommended',
    
        // Uncomment any of the lines below to choose desired strictness,
        // but leave only one uncommented!
        // See https://eslint.vuejs.org/rules/#available-rules
        'plugin:vue/vue3-essential', // Priority A: Essential (Error Prevention)
        // 'plugin:vue/vue3-strongly-recommended', // Priority B: Strongly Recommended (Improving Readability)
        // 'plugin:vue/vue3-recommended', // Priority C: Recommended (Minimizing Arbitrary Choices and Cognitive Overhead)
    

      ],
      rules: {
    
        'prefer-promise-reject-errors': 'off',
    
        quotes: ['warn', 'single', { avoidEscape: true }],
    
        // this rule, if on, would require explicit return type on the `render` function
        '@typescript-eslint/explicit-function-return-type': 'off',
    "@typescript-eslint/no-empty-function": "off",
        // in plain CommonJS modules, you can't use `import foo = require('foo')` to pass this rule, so it has to be disabled
        '@typescript-eslint/no-var-requires': 'off',
    
        // The core 'no-unused-vars' rules (in the eslint:recommended ruleset)
        // does not work with type definitions
        'no-unused-vars': 'off',
    
        // allow debugger during development only
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
,
        "no-extra-semi": "off",
        "@typescript-eslint/no-extra-semi": "off"
      }
}