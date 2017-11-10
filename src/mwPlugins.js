/**************************************************
 * Created by nanyuantingfeng on 27/10/2017 16:25.
 **************************************************/
import path from 'path'

import {
  CaseSensitivePathsPlugin,
  CommonsChunkPlugin,
  ExtractTextPlugin,
  FriendlyErrorsWebpackPlugin,
  ProgressPlugin,
  NoEmitOnErrorsPlugin,
  UglifyJsPlugin,
  mapJSONWebpackPlugin,
  HashedModuleIdsPlugin,
  ModuleConcatenationPlugin,
} from './plugins'

import { notifier, fnProgressHandler } from './util'

export default async function (context, next) {
  context.plugins = [
    new CaseSensitivePathsPlugin(),
    new FriendlyErrorsWebpackPlugin({
      onErrors: (severity, errors) => {
        if (severity !== 'error') {
          notifier.notify({
            title: 'hollow cli',
            message: 'warn',
            contentImage: path.join(__dirname, '../assets/warn.png'),
            sound: 'Glass',
          })
          return
        }
        const error = errors[0]
        notifier.notify({
          title: 'hollow cli',
          message: `${severity} : ${error.name}`,
          subtitle: error.file || '',
          contentImage: path.join(__dirname, '../assets/fail.png'),
          sound: 'Glass',
        })
      },
    }),
    new ProgressPlugin(fnProgressHandler),
    new NoEmitOnErrorsPlugin(),
    new ModuleConcatenationPlugin(),  //scope hoisting
  ]

  next()

  const {hash, compress, cache, packageMap, plugins, dll, devtool} = context
  const cssFileName = hash ? '[name]-[chunkhash].css' : '[name].css'
  const commonName = hash ? 'common-[chunkhash].js' : 'common.js'

  if (!Array.isArray(dll)) {
    plugins.push(new CommonsChunkPlugin({
      name: 'common',
      filename: commonName,
      minChunks: 3,
    }))
  }

  plugins.push(new ExtractTextPlugin({
    filename: cssFileName,
    disable: false,
    allChunks: true
  }))

  plugins.push(new HashedModuleIdsPlugin())

  if (compress === true) {
    plugins.push(new UglifyJsPlugin({
      output: {ascii_only: true,},
      compress: {warnings: false,},
      sourceMap: !!devtool
    }))
  }

  if (hash) {
    plugins.push(mapJSONWebpackPlugin({assetsPath: packageMap.name, cache,}))
  }

  context.plugins = plugins

}
