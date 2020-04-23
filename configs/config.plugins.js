/***************************************************
 * Created by nanyuantingfeng on 2019-06-25 19:16. *
 ***************************************************/
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin')
// const LodashWebpackPlugin = require('lodash-webpack-plugin')
const { IgnorePlugin } = require('webpack')

module.exports = function(config) {
  config.plugin('CaseSensitivePathsPlugin').use(CaseSensitivePathsPlugin)
  config.plugin('IgnorePlugin').use(IgnorePlugin, [/^\.\/locale$/, /moment$/])
  /*  config.plugin('LodashWebpackPlugin').use(LodashWebpackPlugin, [
    {
      shorthands: true,
      paths: true,
      cloning: true,
      flattening: true,
      exotics: true,
      collections: true,
      caching: true
    }
  ])*/
}
