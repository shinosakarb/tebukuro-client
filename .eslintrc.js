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
    "react/react-in-jsx-scope": "off",
    "react/jsx-filename-extension": ["error", { "extensions": [".js", ".jsx"] }]
  },
  "settings": {
    "flowtype": {
      "onlyFilesWithFlowAnnotation": true,
    },
  }
};
