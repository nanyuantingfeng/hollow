/***************************************************
 * Created by nanyuantingfeng on 2019-06-26 12:27. *
 ***************************************************/
const config = require('./webpack.plugin.config')

config.output.filename('[name].js').chunkFilename('[name].js')

const { moduleName } = config.getEntryNameAndPluginName()

config.devServer
  .host('0.0.0.0')
  .port(require('./scripts/find-free-port')())
  .set('injectClient', false)
  .hot(false)
  .hotOnly(false)
  .publicPath(`/assets/${moduleName}/`)

module.exports = config
