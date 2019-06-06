module.exports = {
  extends: ["airbnb-base", "prettier"],
  env: {
    browser: true
  },
  rules: {
    "no-restricted-syntax": 0
  },
  overrides: [
    {
      files: ["**/*.test.js"],
      env: {
        jest: true
      }
    }
  ]
};
