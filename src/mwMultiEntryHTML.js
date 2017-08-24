/**************************************************
 * Created by nanyuantingfeng on 24/08/2017 18:42.
 **************************************************/
import path from 'path'
import {
  CopyWebpackPlugin,
  DefinePlugin,
  HTMLWebpackPlugin,
} from './plugins'

function buildCopyFiles (files) {
  if (Array.isArray(files)) {
    return files
  }
  return Object.keys(files).filter(key => !!files[key].path).map(key => {
    let val = files[key]
    return {from: val.path, to: val.to}
  })
}

function buildExternals (files) {
  let ret = {}
  Object.keys(files).filter(key => !!files[key].name).forEach(key => {
    ret[key] = files[key].name
  })
  return ret
}

function build4DevelopmentENV (filesMap) {
  let ret = []
  Object.keys(filesMap).forEach(key => {
    let line = filesMap[key]
    let path = line.path
    if (line.name && path) {
      ret.push(path)
    }
  })
  return ret
}

function build4ProductionENV (filesMap) {
  let ret = []
  Object.keys(filesMap).forEach(key => {
    let line = filesMap[key]
    let path = line.path
    if (line.name && path) {
      let paths = path.split('/')
      path = paths[paths.length - 1]
      ret.push(path)
    }
  })
  return ret
}

function buildHTMLData (filesMap, env) {
  switch (env) {
    case 'production' :
    case 'beta' :
      return build4ProductionENV(filesMap)
    default:
      return build4DevelopmentENV(filesMap)
  }
}

function buildHTML ({entry, externals, sdks, env}, entry2, htmlWebpackPluginOptions) {
  entry = entry || entry2

  if (typeof entry === 'string') {
    entry = {index: entry}
  }

  let oo = []
  let paths = buildHTMLData(externals, env)
  let entryNames = Object.keys(entry)

  let tmp = {
    template: path.join(__dirname, '../index.hbs'),
    favicon: path.join(__dirname, '../favicon.ico'),
    ...htmlWebpackPluginOptions
  }

  entryNames.forEach(name => {
    let excludes = []

    entryNames.forEach(line => {
      if (line !== name) {
        excludes.push(line)
      }
    })

    let sdk = sdks[name]
    let cPaths = paths.slice(0)

    if (typeof sdk === 'string') {
      sdk = [sdk]
    }

    Array.prototype.unshift.apply(cPaths, sdk)

    oo.push({
      PATHS: cPaths,
      filename: name + '.html',
      excludeChunks: excludes,
      ...tmp
    })

  })

  return oo
}

export default async function (context, next) {
  next()

  let {webpackConfig, packageMap, args} = context
  let {default_node_env} = args

  let env = process.env.NODE_ENV || default_node_env || 'development'

  let isProdENV = env === 'production'
  let isDevENV = env === 'development'
  let isBetaENV = env === 'beta'

  /******************
   *#source-map 编译过慢
   * production 环境不需要
   * beta 环境需要
   */
  if (webpackConfig.devtool === true) {
    webpackConfig.devtool = isProdENV ? false
      : isBetaENV ? '#source-map'
        : isDevENV ? '#inline-module-eval-source-map'
          : false
  }

  let {plugins = [], htmlWebpackPluginOptions} = webpackConfig

  /***********************
   * copy文件到输出目录
   */
  if (args.files) {
    plugins.push(new CopyWebpackPlugin(buildCopyFiles(args.files)))
  }

  /***********************
   * 多入口配置
   */
  buildHTML(args, packageMap.entry, htmlWebpackPluginOptions).forEach(line => {
    plugins.push(new HTMLWebpackPlugin(line))
  })

  /***********************
   * 配置忽略依赖
   */
  if (args.externals) {
    webpackConfig.externals = buildExternals(args.externals)
  }

  let version = args.version
  version = isProdENV ? version
    : isBetaENV ? version + '-beta'
      : isDevENV ? version + '-dev'
        : false

  plugins.push(new DefinePlugin({
    ['process.env.NODE_ENV']: JSON.stringify(env),
    APPLICATION_VERSION: JSON.stringify('v' + version),
    ...args.defines
  }))

  if (args.provides) {
    plugins.push(new ProvidePlugin(args.provides))
  }

  webpackConfig.plugins = plugins

}
