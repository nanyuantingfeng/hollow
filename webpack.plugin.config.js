const path = require('path')
const fs = require('fs')
const config = require('./configs')()

const { entryName, pluginName, moduleName, UniqueName } = config.getEntryNameAndPluginName()

const __has = name => fs.existsSync(path.join(process.cwd(), name))

const __index = () => {
  if (__has('./src/index.ts')) return './src/index.ts'
  if (__has('./src/index.js')) return './src/index.js'
  throw new Error('没有找到 ./src/index.[jt]s')
}

config.entry(moduleName).add(__index())

config.output
  .path(path.resolve(process.cwd(), 'build'))
  .filename('[name].[contenthash:8].js')
  .chunkFilename('[name].[contenthash:8].js')
  .libraryTarget('assign')
  .library(['__WHISPERED_PLUGINS__', pluginName])
  .jsonpFunction(`jsonp__${UniqueName}`)
  .hotUpdateFunction(`hot__${UniqueName}`)
  .libraryExport('default')
  .publicPath(`/assets/${moduleName}/`)

config.useClusterWorker({ masterId: entryName, workerId: moduleName, entry: moduleName })

module.exports = config
