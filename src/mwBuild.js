/**************************************************
 * Created by nanyuantingfeng on 16/08/2017 13:10.
 **************************************************/
import path from 'path'

import {
  NoEmitOnErrorsPlugin,
  mapJSONWebpackPlugin,
  UglifyJsPlugin,
  ProgressPlugin,
} from './plugins'

import {
  fnProgressHandler,
  fnCheckWebpackConfig,
  fnGetValueByPath,
} from './util'

export default async function (context, next) {
  let {cwd} = context

  context.packageMap = fnGetValueByPath(path.join(cwd, 'package.json'))
  context.rules = []
  
  next()

  let {webpackConfig, cache, packageMap} = context

  let {plugins = []} = webpackConfig

  webpackConfig.entry = context.entry || packageMap.entry

  let {outputPath, publicPath, compress, hash} = context

  if (outputPath) {
    webpackConfig.output.path = outputPath
  }

  if (publicPath) {
    webpackConfig.output.publicPath = publicPath
  }

  if (compress === true) {
    plugins.push(new UglifyJsPlugin({
      output: {ascii_only: true,},
      compress: {warnings: false,},
    }))
  }

  plugins.push(... [
    new ProgressPlugin(fnProgressHandler),
    new NoEmitOnErrorsPlugin(),
  ])

  if (hash) {
    webpackConfig.output.filename = '[name]-[chunkhash].js'
    webpackConfig.output.chunkFilename = '[name]-[chunkhash].js'
    plugins.push(mapJSONWebpackPlugin({assetsPath: packageMap.name, cache,}))
  }

  webpackConfig.plugins = plugins

  fnCheckWebpackConfig(webpackConfig)

  return context
}

