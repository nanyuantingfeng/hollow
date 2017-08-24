/**************************************************
 * Created by nanyuantingfeng on 16/08/2017 13:10.
 **************************************************/
import path from 'path'

import {
  DefinePlugin,
  NoEmitOnErrorsPlugin,
  mapJSONWebpackPlugin,
  UglifyJsPlugin,
  ProgressPlugin,
} from './webpackPlugins'

import { progressHandler } from './util'

function fnCheckWebpackConfig (webpackConfig) {
  const configs = Array.isArray(webpackConfig) ? webpackConfig : [webpackConfig]
  const hasEmptyEntry = configs.some(c => Object.keys(c.entry || {}).length === 0)
  if (hasEmptyEntry) {
    let e = new Error('no webpack entry found')
    e.name = 'NoEntry'
    throw e
  }
}

export default async function (context, next) {
  next()

  let {webpackConfig, args, cache} = context

  let {plugins = []} = webpackConfig

  let {default_node_env, outputPath, publicPath, compress, cwd} = args

  if (outputPath) {
    webpackConfig.output.path = outputPath
  }

  if (publicPath) {
    webpackConfig.output.publicPath = publicPath
  }

  let env = process.env.NODE_ENV || default_node_env || 'development'

  plugins.push(new DefinePlugin({
    ['process.env.NODE_ENV']: JSON.stringify(env),
  }))

  if (env === 'production') {
    compress = true
  }

  if (compress === true) {
    plugins.push(new UglifyJsPlugin({
      output: {ascii_only: true,},
      compress: {warnings: false,},
    }))
  }

  plugins.push(... [
    new ProgressPlugin(progressHandler),
    new NoEmitOnErrorsPlugin(),
  ])

  if (args.hash) {
    const packageMap = require(path.join(cwd, 'package.json'))
    webpackConfig.output.filename = '[name]-[chunkhash].js'
    webpackConfig.output.chunkFilename = '[name]-[chunkhash].js'
    plugins.push(mapJSONWebpackPlugin({assetsPath: packageMap.name, cache,}))
  }

  webpackConfig.plugins = plugins

  fnCheckWebpackConfig(webpackConfig)

  return webpackConfig
}

