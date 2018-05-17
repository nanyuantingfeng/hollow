/**************************************************
 * Created by nanyuantingfeng on 27/10/2017 16:25.
 **************************************************/
import path from 'path'

import {
  ExtractTextPlugin,
  FriendlyErrorsWebpackPlugin,
  ProgressPlugin,
  HashedModuleIdsPlugin,
  AggressiveSplittingPlugin,
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
    /*    new AggressiveSplittingPlugin({
     minSize: 100 * 1024, // 字节，分割点。默认：30720
     maxSize: 200 * 1024, // 字节，每个文件最大字节。默认：51200
     chunkOverhead: 0, // 默认：0
     entryChunkMultiplicator: 1, // 默认：1
     }),*/
  ]

  next()

  const { hash, compress, plugins, dll } = context
  const cssFileName = hash ? '[name]-[chunkhash].css' : '[name].css'

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

  //context.webpackConfig.recordsOutputPath = path.join(cwd, 'dist', 'records.json')
}
