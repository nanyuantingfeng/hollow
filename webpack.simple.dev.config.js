/***************************************************
 * Created by nanyuantingfeng on 2019-06-26 12:27. *
 ***************************************************/
const path = require('path')
const config = require('./webpack.simple.config')

config.output.filename('[name].js').chunkFilename('[name].chunk.js')
config.devtool('eval')

config.devServer
  .contentBase(path.resolve(process.cwd(), 'src'))
  .host('0.0.0.0')
  .port(require('./scripts/find-free-port')())
  .watchContentBase(true)
  .disableHostCheck(true)
  .set('injectHot', false)
  .publicPath('/')

module.exports = config
