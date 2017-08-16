
var I18nPlugin = require("i18n-webpack-plugin");

var langs = {
  "en": null,
  "de": require("./de.json")
};

module.exports = function(webpackConfig) {
  return Object.keys(langs).map(function(lang) {
    return Object.assign({}, webpackConfig, {
      name: lang,
      output: Object.assign({}, webpackConfig.output, {
        filename: 'app.' + lang + '.js',
      }),
      plugins: [].concat(webpackConfig.plugins, new I18nPlugin(
        langs[lang]
      )),
    });
  });
};
