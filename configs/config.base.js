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
    //  ["react"]: path.dirname(require.resolve("react/package.json")),
    /*   ["react-dom"]: path.dirname(
      require.resolve("@hot-loader/react-dom/package.json")
    ),*/
    /*  ["react-hot-loader"]: path.dirname(
      require.resolve("react-hot-loader/package.json")
    ),*/
    ['babel-core']: path.dirname(require.resolve('babel-core/package.json')),
    ['tslib']: path.dirname(require.resolve('tslib/package.json'))
  })

  config.context(cwd)

  config.module
    .set('unknownContextCritical', false)
    .set('noParse', [/moment$/])
    .set('strictExportPresence', false)

  config.plugin('DefinePlugin').use(DefinePlugin, [
    {
      __DEV__: isDevelopment,
      VERSION: JSON.stringify(getVersion(packageMap)[0]),
      APPLICATION_VERSION: JSON.stringify(getVersion(packageMap)[1]),
      ['process.env.NODE_ENV']: JSON.stringify(env),
      ['process.env.ASSET_PATH']: JSON.stringify(process.env.ASSET_PATH)
    }
  ])

  config.node.merge(getNode(packageMap))
}
