/***************************************************
 * Created by nanyuantingfeng on 2019-06-26 12:27. *
 ***************************************************/
const path = require('path')
const config = require('./webpack.entry.config')

config.devtool('source-map')

config.devServer
  .contentBase(path.resolve(process.cwd(), 'src'))
  .port(9999)
  .watchContentBase(true)
  .disableHostCheck(true)
  .set('injectHot', false)

module.exports = config.toConfig()
