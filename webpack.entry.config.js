const path = require('path')
const config = require('./configs')()

config.output
  .path(path.resolve(process.cwd(), 'build'))
  .filename('[name].[hash:8].js')
  .publicPath(process.env.ASSET_PATH || './')

const { entryName } = config.getEntryNameAndPluginName()

config.useClusterMaster({
  masterId: entryName,
  injected: `
    var __WHISPERED_PLUGINS__ = window.__WHISPERED_PLUGINS__ = window.__WHISPERED_PLUGINS__ || {};
    require('./.dist/assets/entry-${entryName}');
  `
})

module.exports = config
