/**************************************************
 * Created by nanyuantingfeng on 27/10/2017 16:25.
 **************************************************/
import path from 'path'

import {
  ExtractTextPlugin,
  FriendlyErrorsWebpackPlugin,
  ProgressPlugin,
  HashedModuleIdsPlugin,
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
    new HashedModuleIdsPlugin(),
  ]

  next()

  const { hash, compress, plugins, dll, devtool } = context
  const cssFileName = hash ? '[name]-[chunkhash].css' : '[name].css'
  const commonName = hash ? 'common-[chunkhash].js' : 'common.js'

  if (!Array.isArray(dll)) {
    context.webpackConfig.optimization.splitChunks = {
      chunks: 'async',
      minSize: 30000,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      name: true,
      cacheGroups: {
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
        vendors: {
          test: /[/]node_modules[/]/,
          priority: -10
        }
      }
    }
  }

  plugins.push(new ExtractTextPlugin({
    filename: cssFileName,
    allChunks: true
  }))

  context.webpackConfig.optimization.minimize = !!compress

  context.plugins = plugins
}
