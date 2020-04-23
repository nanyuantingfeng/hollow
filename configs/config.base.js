/***************************************************
 * Created by nanyuantingfeng on 2019-06-25 18:56. *
 ***************************************************/
const path = require('path')
const { DefinePlugin } = require('webpack')
const { cwd, isDevelopment, isBeta, env, packageMap } = require('./const.env')

function getNode(packageMap) {
  const emptyBuildIns = ['child_process', 'cluster', 'dgram', 'dns', 'fs', 'module', 'net', 'readline', 'repl', 'tls']

  const browser = packageMap.browser || {}

  return emptyBuildIns.reduce((obj, name) => {
    if (!(name in browser)) {
      return { ...obj, ...{ [name]: 'empty' } }
    }
    return obj
  }, {})
}

function getVersion(packageMap) {
  const version = packageMap.version || '0.0.0'
  const versionTail = isBeta ? '-beta' : isDevelopment ? '-dev' : ''
  return [version, `v${version}${versionTail}`]
}

module.exports = function(config) {
  config.mode(env === 'beta' ? 'production' : env)

  config.resolve.modules.merge(['node_modules'])
  config.resolve.extensions.merge([
    '.web.tsx',
    '.web.ts',
    '.web.jsx',
    '.web.js',
    '.ts',
    '.tsx',
    '.js',
    '.jsx',
    '.json',
    '.json5',
    '.worker.js',
    '.worker.jsx',
    /*".gql",
      ".graphql", */
    '.mjs',
    '.mjsx'
  ])

  config.resolve.alias.merge({
    ['@babel/runtime']: path.dirname(require.resolve('@babel/runtime/package.json')),
    ['babel-core']: path.dirname(require.resolve('babel-core/package.json')),
    ['babel-runtime/core-js']: '@babel/runtime-corejs3/core-js',
    ['babel-runtime']: '@babel/runtime'
  })

  config.module.rule('parser').parser({ requireEnsure: false, system: false })

  config.context(cwd)

  config.module
    .set('unknownContextCritical', false)
    .set('strictExportPresence', false)
    .set('noParse', [/moment$/])

  config.plugin('DefinePlugin').use(DefinePlugin, [
    {
      __DEV__: isDevelopment,
      VERSION: JSON.stringify(getVersion(packageMap)[0]),
      APPLICATION_VERSION: JSON.stringify(getVersion(packageMap)[1]),
      ['process.env.NODE_ENV']: JSON.stringify(env),
      ['process.env.ASSET_PATH']: JSON.stringify(process.env.ASSET_PATH || './')
    }
  ])

  config.node.merge(getNode(packageMap))

  config.stats({
    all: undefined,

    // 添加资源信息
    assets: true,

    // 对资源按指定的字段进行排序
    assetsSort: '!size',

    // 添加构建时间信息
    builtAt: true,

    // 添加模块被引入的原因
    reasons: true,

    colors: true,

    version: true,

    children: false,

    // 添加 compilation 的哈希值
    hash: false,

    // 添加时间信息
    timings: true,

    // 添加警告
    warnings: true,

    // 当文件大小超过 `performance.maxAssetSize` 时显示性能提示
    performance: false,

    cached: false,

    cachedAssets: false,

    chunks: false,

    // 添加构建模块信息
    modules: false,

    // 将构建模块信息添加到 chunk 信息
    chunkModules: false,

    // 添加 --env information
    env: true,

    // 显示每个模块到入口起点的距离(distance)
    depth: false,

    exclude: /node_modules/
  })
}
