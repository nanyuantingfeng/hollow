/**************************************************
 * Created by nanyuantingfeng on 16/08/2017 13:10.
 **************************************************/
import path from 'path'
import fs from 'fs'

import {
  DefinePlugin, NoEmitOnErrorsPlugin,
  mapJSONWebpackPlugin, UglifyJsPlugin,
} from './webpackPlugins'

function fnCheckWebpackConfig (webpackConfig) {
  const configs = Array.isArray(webpackConfig) ? webpackConfig : [webpackConfig]
  const hasEmptyEntry = configs.some(c => Object.keys(c.entry || {}).length === 0)
  if (hasEmptyEntry) {
    const err = new Error('no webpack entry found')
    err.name = 'NoEntry'
    throw err
  }
}

function fnMergeCustomConfig (webpackConfig, customConfigPath) {
  if (!fs.existsSync(customConfigPath)) {
    return webpackConfig
  }

  let customConfig = require(customConfigPath)

  if (typeof customConfig === 'function') {
    return customConfig(webpackConfig, ...[...arguments].slice(2))
  }

  throw new Error(`Return of ${customConfigPath} must be a function.`)
}

export default async function (context, next) {
  next()

  let {webpackConfig, args, cache} = context

  webpackConfig.plugins = webpackConfig.plugins || []

  // Config outputPath.
  if (args.outputPath) {
    webpackConfig.output.path = args.outputPath
  }

  if (args.publicPath) {
    webpackConfig.output.publicPath = args.publicPath
  }

  // Watch mode should not use UglifyJsPlugin
  if (args.compress && !args.watch) {
    let UglifyJsPluginConfig = {
      output: {
        ascii_only: true,
      },
      compress: {
        warnings: false,
      },
    }
    webpackConfig.plugins = [
      ...webpackConfig.plugins,
      new UglifyJsPlugin(UglifyJsPluginConfig),
      new DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production'),
      }),
    ]
  } else {
    webpackConfig.plugins = [
      ...webpackConfig.plugins,
      new DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      }),
    ]
  }

  webpackConfig.plugins = [
    ...webpackConfig.plugins,
    new NoEmitOnErrorsPlugin(),
  ]

  // Output map.json if hash.
  if (args.hash) {
    const pkg = require(path.join(args.cwd, 'package.json'))
    webpackConfig.output.filename = '[name]-[chunkhash].js'
    webpackConfig.output.chunkFilename = '[name]-[chunkhash].js'
    webpackConfig.plugins = [
      ...webpackConfig.plugins,
      mapJSONWebpackPlugin({
        assetsPath: pkg.name,
        cache,
      }),
    ]
  }

  if (typeof args.config !== 'function') {
    webpackConfig = fnMergeCustomConfig(webpackConfig,
      path.resolve(args.cwd, args.config || 'webpack.config.js'))
  }

  fnCheckWebpackConfig(webpackConfig)

  return webpackConfig
}

