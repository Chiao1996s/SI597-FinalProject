module.exports = {
  "env": {
    "browser": true,
    "es6": true,
    "node": true
  },
  "plugins": [ "no-for-loop", "unicorn" ],
  "rules": {
    "no-for-loop/no-for-loop": ["warn"],
    "indent": ["warn", 2],
    "no-var": ["warn"],
    "prefer-const": "warn",
    "no-const-assign": "warn",
    "prefer-template": "warn",
    "template-curly-spacing": "warn",
    "camelcase": "warn",
    "new-cap": "warn",
    "arrow-parens": "warn",
    "arrow-body-style": "warn",
    "brace-style": ["warn", "stroustrup"],
    "no-console": "warn",
    "no-unused-vars": "warn",
    "unicorn/prefer-query-selector": "warn",
  }
}
