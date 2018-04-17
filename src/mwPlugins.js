/**************************************************
 * Created by nanyuantingfeng on 27/10/2017 16:25.
 **************************************************/
import path from 'path'

import {
  CommonsChunkPlugin,
  ExtractTextPlugin,
  FriendlyErrorsWebpackPlugin,
  ProgressPlugin,
  NoEmitOnErrorsPlugin,
  UglifyJsPlugin,
  HashedModuleIdsPlugin,
  ModuleConcatenationPlugin,
} from './plugins'

import { notifier, fnProgressHandler } from './util'

export default async function (context, next) {
  context.plugins = [
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
          message: `${severity} : ${error ? error.name : error}`,
          subtitle: error ? error.file : error || '',
          contentImage: path.join(__dirname, '../assets/fail.png'),
          sound: 'Glass',
        })
      },
    }),
    new ProgressPlugin(fnProgressHandler),
    new NoEmitOnErrorsPlugin(),
    new ModuleConcatenationPlugin(),  //scope hoisting
    new HashedModuleIdsPlugin(),
  ]

  next()

  const { hash, compress, plugins, dll, devtool } = context
  const cssFileName = hash ? '[name]-[chunkhash].css' : '[name].css'
  const commonName = hash ? 'common-[chunkhash].js' : 'common.js'

  if (!Array.isArray(dll)) {

    plugins.push(new CommonsChunkPlugin({
      name: 'common',
      filename: commonName,
      minChunks: 2,
    }))

    //split import() and require.ensure modules common chunks
    plugins.push(new CommonsChunkPlugin({
      async: true,
      minChunks: (module, count) => {
        if (module.resource && (/^.*\.(css|less)$/).test(module.resource)) {
          return false
        }
        return !!module.context && count >= 2
      }
    }))
  }

  plugins.push(new ExtractTextPlugin({
    filename: cssFileName,
    allChunks: true
  }))

  if (compress === true) {
    plugins.push(new UglifyJsPlugin({
      parallel: true,
      cache: true,
      sourceMap: !!devtool,
    }))
  }

  context.plugins = plugins
}
