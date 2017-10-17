module.exports = {
  "parser": "babel-eslint",
  "extends": "airbnb",
  "plugins": ["flowtype"],
  "rules": {
    "semi": "off",
    "react/react-in-jsx-scope": "off",
    "react/jsx-filename-extension": ["error", { "extensions": [".js", ".jsx"] }],
  },
};
