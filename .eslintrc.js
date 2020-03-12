module.exports = {
  root: true,
  env: {
    node: true,
    browser: true
  },
  parserOptions: {
    "parser": "babel-eslint"
  },
  extends: [
    "plugin:prettier/recommended",
    "plugin:vue/essential",
    'eslint:recommended'
  ],
  rules: {
    "vue/no-unused-vars": "error",
    "space-before-function-paren": "always",
  },
  plugins: ["html", "vue"]
}
