module.exports = {
  "env": {
    "jest": true
  },
  "extends": [
    "airbnb",
    "plugin:flowtype/recommended",
    "plugin:jest/recommended"
  ],
  "parser": "babel-eslint",
  "plugins": [
    "flowtype",
    "jest"
  ],
  "rules": {
    "semi": "off",
    "class-methods-use-this": "off",
    "react/react-in-jsx-scope": "off",
    "react/jsx-filename-extension": ["error", { "extensions": [".js", ".jsx"] }],
    "no-unused-expressions": ["error", {"allowShortCircuit": true}],
    "jsx-a11y/anchor-is-valid":  "off",
  },
  "settings": {
    "flowtype": {
      "onlyFilesWithFlowAnnotation": true
    },
  },
  "globals": {
    "window": true
  },
};
