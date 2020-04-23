const path = require('path')
const config = require('./configs')()

config.optimization.merge({
  runtimeChunk: false,
  splitChunks: {
    chunks: 'all',
    name: false
  }
})

config.output
  .path(path.resolve(process.cwd(), 'dist'))
  .filename('[name]-[hash].js')
  .chunkFilename('[name].chunk-[hash].js')
  .pathinfo(true)
  .publicPath(process.env.ASSET_PATH || './')

module.exports = config
