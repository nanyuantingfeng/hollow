/**************************************************
 * Created by nanyuantingfeng on 27/10/2017 16:25.
 **************************************************/
import path from 'path'

import {
  MiniCssExtractPlugin,
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
  ]

  next()

  const { hash, compress, plugins, dll } = context
  if (!Array.isArray(dll)) {
    context.webpackConfig.optimization.splitChunks = {
      chunks: 'async',
      minSize: 244 * 1024,
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

  const filename = hash ? '[name]-[hash].css' : '[name].css'
  const chunkFilename = hash ? '[id]-[hash].css' : '[id].css'

  plugins.push(new MiniCssExtractPlugin({
    filename,
    chunkFilename,
  }))

  context.webpackConfig.optimization.minimize = !!compress

  // dll 模式下不能使用当前插件
  if (!Array.isArray(dll)) {
    plugins.push(new AggressiveSplittingPlugin({
      minSize: 244 * 1024,
      maxSize: 800 * 1024,
      chunkOverhead: 0,
      entryChunkMultiplicator: 1,
    }))
  }

  context.plugins = plugins

  //context.webpackConfig.recordsOutputPath = path.join(cwd, 'build', 'records.json')
}
