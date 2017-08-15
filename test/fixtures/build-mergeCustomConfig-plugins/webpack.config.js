module.exports = function(webpackConfig) {
  webpackConfig.output.filename = "[name].js";
  webpackConfig.plugins = [];
  return webpackConfig;
}