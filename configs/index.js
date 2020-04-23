/***************************************************
 * Created by nanyuantingfeng on 2019-06-25 17:31. *
 ***************************************************/
const deepmerge = require('deepmerge')
const Config = require('webpack-chain')

module.exports = function() {
  const config = new Config()

  require('./config.base')(config)
  require('./config.dev.server')(config)
  require('./config.plugins')(config)
  require('./config.optimization')(config)
  require('./config.devtool')(config)
  require('./config.analyzer')(config)

  config.getEntryNameAndPluginName = () => {
    const { packageMap } = require('./const.env')
    // plugin package.json 中的 name 一定是 @namespace/plugin-<entry>-<name> 的形式
    const moduleName = packageMap.name.split('/').pop() // plugin-<entry>-<name>
    const UniqueName = moduleName.replace(/-/gim, '_') // plugin_<entry>_<name>

    if (moduleName.startsWith('entry')) {
      const result = moduleName.match(/entry-(.*)$/)

      if (!result) {
        throw new Error(`invalid module name: ${moduleName}, should be @namespace/entry-<name>`)
      }

      const [, entryName] = result
      return { entryName, moduleName, UniqueName }
    }

    if (moduleName.startsWith('plugin')) {
      const result = moduleName.match(/plugin-([^-]*)-(.*)$/)

      if (!result) {
        throw new Error(`invalid module name: ${moduleName}, should be @namespace/plugin-<entry>-<name>`)
      }

      const [, entryName, pluginName] = result
      return { entryName, pluginName, moduleName, UniqueName }
    }

    throw new Error(
      `invalid module name: ${moduleName}, should be @namespace/entry-<name> or @namespace/plugin-<entry>-<name>`
    )
  }

  config.useClusterWorker = options => {
    require('./patch.development').forPlugin(options)(config)
    return config
  }
  config.useClusterMaster = options => {
    require('./patch.development').forEntry(options)(config)
    return config
  }

  const ___ES5_BROWSERS_LIST = [
    'last 2 versions',
    'Firefox >= 33',
    '> 1%',
    'IE >= 11',
    'iOS >= 8',
    'Android >= 4',
    'chrome >= 39',
    'Edge >= 12',
    'Safari >= 9'
  ]

  const ___ES6_BROWSERS_LIST = [
    'last 2 Chrome versions',
    'not Chrome < 60',
    'last 2 Safari versions',
    'not Safari < 10.1',
    'last 2 iOS versions',
    'not iOS < 10.3',
    'last 2 Firefox versions',
    'not Firefox < 54',
    'last 2 Edge versions',
    'not Edge < 15'
  ]

  config.$$cache = {
    browserslist: ___ES5_BROWSERS_LIST,
    compilertarget: 'es5'
  }

  config.patch = options => {
    config.$$cache = deepmerge(config.$$cache, options)
  }
  config.patch.defines = defines => {
    if (defines) config.$$cache.defines = deepmerge(config.$$cache.defines, defines)
  }
  config.patch.provides = provides => {
    if (provides) config.$$cache.provides = deepmerge(config.$$cache.provides, provides)
  }
  config.patch.externals = externals => {
    if (externals) config.$$cache.externals = deepmerge(config.$$cache.externals, externals)
  }
  config.patch.noParse = noParse => {
    if (noParse) config.$$cache.noParse = deepmerge(config.$$cache.noParse || [], noParse)
  }
  config.patch.htmls = htmls => {
    if (htmls) config.$$cache.htmls = deepmerge(config.$$cache.htmls, htmls)
  }
  config.patch.vendors = vendors => {
    if (vendors) config.$$cache.vendors = deepmerge(config.$$cache.vendors || [], vendors)
  }
  config.patch.files = files => {
    if (files) config.$$cache.files = deepmerge(config.$$cache.files, files)
  }
  config.patch.sdks = sdks => {
    if (sdks) config.$$cache.sdks = deepmerge(config.$$cache.sdks, sdks)
  }
  config.patch.entry = entry => {
    if (entry) {
      if (typeof entry === 'string') {
        entry = { index: entry }
      }
      config.$$cache.entry = deepmerge(config.$$cache.entry, entry)
    }
  }
  config.patch.imports = imports => {
    if (imports) {
      if (!Array.isArray(imports)) {
        imports = [imports]
      }
      config.$$cache.imports = (config.$$cache.imports || []).concat(imports)
    }
  }

  config.patch.browserslist = (browserslist, compilertarget) => {
    compilertarget = compilertarget || config.$$cache.compilertarget

    if (browserslist === 'es6') {
      browserslist = ___ES6_BROWSERS_LIST
      compilertarget = 'es6'
    }

    if (browserslist === 'es5') {
      browserslist = ___ES5_BROWSERS_LIST
      compilertarget = 'es5'
    }

    if (!Array.isArray(browserslist)) {
      throw new Error("config.patch.browserslist() argument must one of  'es6' | 'es5' | `string[]` ")
    }

    config.$$cache.browserslist = browserslist
    config.$$cache.compilertarget = compilertarget
  }
  config.patch.pxtorem = options => {
    if (options === true) {
      config.$$cache.pxtorem = { rootValue: 100 }
      return
    }
    config.$$cache.pxtorem = options
  }
  config.patch.alias = options => {
    if (options) config.resolve.alias.merge(options)
  }

  // OLD toConfig at Lazy Call
  const toConfig = config.toConfig.bind(config)

  // https://github.com/TypeStrong/ts-loader/issues/751
  // transpileOnly is enabled, export interface not being found!!!!
  config.stats({ warningsFilter: /export .* was not found in/ })

  config.toConfig = () => {
    require('./patch')(config.$$cache)(config)
    require('./config.resources')(config)
    require('./config.css')(config)
    require('./config.script')(config)
    return toConfig()
  }

  return config
}
