/***************************************************
 * Created by nanyuantingfeng on 2019-07-02 18:33. *
 ***************************************************/
const { isDevelopment } = require('./const.env')
const WebpackCDNPlugin = require('webpack-cdn-plugin')

module.exports = function(modules) {
  return config => {
    if (!modules) {
      return
    }

    const hasHtmlWebpackPlugin = config.plugins.has('HtmlWebpackPlugin')

    // for entry
    if (hasHtmlWebpackPlugin) {
      config.plugin('WebpackCdnPlugin').use(WebpackCDNPlugin, [
        {
          prod: !isDevelopment,
          modules: modules,
          publicPath: 'node_modules'
        }
      ])
      return config
    } else {
      // for plugin
      config.externals([modules.reduce((a, b) => ({ ...a, [b.name]: b.var }), {})])
    }
  }
}
