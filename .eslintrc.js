module.exports = {
    "extends": "airbnb",
    "parser": "babel-eslint",
    "rules": {
        "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
        "jsx-a11y/anchor-is-valid": 0,
        "react/prop-types": 0,
        "semi": 0,
        "operator-assignment": ["error", "never"],
        "no-underscore-dangle": 0,
        "prefer-destructuring": 0,
        "react/jsx-no-bind": 0,
    },
    "globals": {
        "document": false
    },
    "env": {
        "browser": true,
        "node": true
      }
};