const { defineConfig } = require("eslint/config");

module.exports = defineConfig({
  ignores: ["src/**", ".next/**", "node_modules/**"],
  rules: {}
});