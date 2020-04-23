/***************************************************
 * Created by nanyuantingfeng on 2019-08-07 18:09. *
 ***************************************************/
const { isDevelopment } = require('./const.env')

module.exports = function(config) {
  if (isDevelopment && process.env.ANALYZE) {
    const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
    config.plugin('BundleAnalyzerPlugin').use(BundleAnalyzerPlugin, [])
  }
}
