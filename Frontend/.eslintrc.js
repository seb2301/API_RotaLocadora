module.exports = {
    parser: "vue-eslint-parser",
    parserOptions: {
      parser: "babel-eslint",
      ecmaVersion: 2020,
      sourceType: "module",
    },
    env: {
      browser: true,
      node: true,
    },
    extends: [
      "eslint:recommended",
      "plugin:vue/recommended", 
    ],
    rules: {
      "vue/no-multiple-template-root": "off", 
    },
  };
  