const path = require('path')
const config = require('./configs')

config.output
  .path(path.resolve(process.cwd(), 'dist'))
  .filename('[name]-[contenthash].js')
  .chunkFilename('[name].chunk-[contenthash].js')
  .globalObject('this')
  .pathinfo(true)
  .publicPath(process.env.ASSET_PATH || './')

module.exports = config
