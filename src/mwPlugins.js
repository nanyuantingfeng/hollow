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
  HardSourceWebpackPlugin,
  UglifyJsPlugin,
  OptimizeCSSAssetsPlugin,
  BundleAnalyzerPlugin
} from './plugins'

import { notifier, fnProgressHandler, getOptions } from './util'

export default async function mwPlugins(context, next) {
  context.plugins = [
    new FriendlyErrorsWebpackPlugin({
      onErrors: (severity, errors) => {
        if (severity !== 'error') {
          notifier.notify({
            title: 'hollow cli',
            message: 'warn',
            contentImage: path.join(__dirname, '../assets/warn.png'),
            sound: 'Glass'
          })
          return
        }
        const error = errors[0]
        notifier.notify({
          title: 'hollow cli',
          message: `${severity} : ${error ? error.name : error}`,
          subtitle: error ? error.file : error || '',
          contentImage: path.join(__dirname, '../assets/fail.png'),
          sound: 'Glass'
        })
      }
    }),
    new ProgressPlugin(fnProgressHandler),
    new HashedModuleIdsPlugin()
  ]

  next()

  const { hash, compress, plugins, dll, ENV } = context

  if (!Array.isArray(dll)) {
    context.webpackConfig.optimization.splitChunks = {
      chunks: 'all',
      minSize: 100,
      minChunks: 1,
      maxAsyncRequests: 6,
      maxInitialRequests: 3,
      name: !ENV.isProduction,
      cacheGroups: {
        styles: {
          name: 'styles',
          test: /\.css$/,
          chunks: 'all',
          enforce: true
        },
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'dependencies',
          priority: -100,
          reuseExistingChunk: true,
          chunks: 'all'
        },
        default: false
      }
    }
  }

  const filename = hash ? '[name]-[hash].css' : '[name].css'
  const chunkFilename = hash ? '[id]-[hash].css' : '[id].css'

  plugins.push(new MiniCssExtractPlugin({ filename, chunkFilename }))

  context.webpackConfig.optimization.minimize = !!compress

  if (compress) {
    context.webpackConfig.optimization.minimizer = [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: false
      }),
      new OptimizeCSSAssetsPlugin({})
    ]
  }

  const { cwd, outputPath, records = false, aggressive = true, analyzer = false } = context

  // dll 模式下不能使用当前插件
  if (!Array.isArray(dll) && aggressive === true) {
    plugins.push(
      new AggressiveSplittingPlugin(
        getOptions(aggressive, {
          minSize: 1,
          maxSize: 1024 * 1024,
          chunkOverhead: 0,
          entryChunkMultiplicator: 1
        })
      )
    )
  }

 // plugins.push(new HardSourceWebpackPlugin())

  context.plugins = plugins

  if (records) {
    context.webpackConfig.recordsOutputPath = path.join(
      cwd,
      outputPath,
      getOptions(records, 'records.json')
    )
  }

  if (analyzer) {
    plugins.push(new BundleAnalyzerPlugin(getOptions(analyzer)))
  }
}
