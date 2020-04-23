/***************************************************
 * Created by nanyuantingfeng on 2019-08-07 18:09. *
 ***************************************************/
const { isDevelopment } = require('./const.env')

module.exports = function(config) {
  // https://webpack.docschina.org/configuration/devtool/
  // at entry/plugin use `source-map`
  config.devtool('source-map')

  if (isDevelopment) {
    config.module
      .rule('source-map')
      .test(/\.jsx?$/)
      .pre()
      .use('source-map-loader')
      .loader('source-map-loader')
  }
}
