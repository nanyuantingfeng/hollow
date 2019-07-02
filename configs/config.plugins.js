/***************************************************
 * Created by nanyuantingfeng on 2019-06-25 19:16. *
 ***************************************************/
const chalk = require("chalk");
const CaseSensitivePathsPlugin = require("case-sensitive-paths-webpack-plugin");
const LodashWebpackPlugin = require("lodash-webpack-plugin");

const { IgnorePlugin, ProgressPlugin } = require("webpack");

function getProgressHandler(percent, msg1, msg2) {
  const stream = process.stdout;
  if (stream.isTTY && percent < 0.7) {
    stream.cursorTo(0);
    stream.write(`\u231B  ${chalk.magenta(msg2)} ${msg1}`);
    stream.clearLine(1);
  } else if (percent >= 1) {
    console.log(chalk.green("\nwebpack: bundle build is now finished"));
  }
}

module.exports = function(config) {
  config.plugin("CaseSensitivePathsPlugin").use(CaseSensitivePathsPlugin);
  config.plugin("ProgressPlugin").use(ProgressPlugin, [getProgressHandler]);
  config.plugin("IgnorePlugin").use(IgnorePlugin, [/^\.\/locale$/, /moment$/]);
  config.plugin("LodashWebpackPlugin").use(LodashWebpackPlugin, [
    {
      shorthands: true,
      paths: true,
      cloning: true,
      flattening: true,
      exotics: true,
      collections: true,
      caching: true
    }
  ]);
};
