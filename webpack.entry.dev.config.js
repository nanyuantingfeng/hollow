/***************************************************
 * Created by nanyuantingfeng on 2019-06-26 12:27. *
 ***************************************************/
const config = require('./webpack.entry.config')

config.output.filename('[name].js').chunkFilename('chunks/[name].js')

config.devServer
  .host('0.0.0.0')
  .port(require('./scripts/find-free-port')())
  .disableHostCheck(true)
  .set('hot', true)
  .set('hotOnly', true)
  .publicPath('/')

module.exports = config
