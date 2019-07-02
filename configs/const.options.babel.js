/***************************************************
 * Created by nanyuantingfeng on 2019-06-25 16:48. *
 ***************************************************/
const { isDevelopment } = require("./const.env");

const babelOptions = {
  cacheDirectory: true,
  babelrc: false,
  highlightCode: true,
  presets: [
    [
      "@babel/preset-env",
      {
        targets: {
          chrome: "39",
          edge: "12",
          ie: "10",
          firefox: "33",
          safari: "9",
          node: "4",
          ios: "9"
        },
        modules: false,
        useBuiltIns: "entry",
        corejs: 3
      }
    ],
    "@babel/preset-react"
  ],
  plugins: [
    "@babel/plugin-external-helpers",
    "@babel/plugin-transform-runtime",
    "@babel/plugin-transform-object-assign",
    "@babel/plugin-syntax-dynamic-import",
    "@babel/plugin-proposal-async-generator-functions",
    "@babel/plugin-transform-regenerator",
    "@babel/plugin-proposal-function-bind",
    "@babel/plugin-proposal-object-rest-spread",
    [
      "@babel/plugin-proposal-decorators",
      {
        legacy: true
      }
    ],
  //  "react-hot-loader/babel",
    [
      "@babel/plugin-proposal-class-properties",
      {
        loose: true
      }
    ],
    "babel-plugin-lodash"
  ]
};

if (isDevelopment) {
  babelOptions.plugins.push("babel-plugin-dynamic-import-node");
}

module.exports = babelOptions;
