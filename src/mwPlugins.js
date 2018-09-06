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
  UglifyJsPlugin,
  OptimizeCSSAssetsPlugin,
  BundleAnalyzerPlugin,
  IgnorePlugin
} from './plugins'

import { notifier, fnProgressHandler, getOptions, nodeObjectHash } from './util'

export default async function(context, next) {
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

  const { hash, compress, plugins, dll, ENV, DIRs } = context

  if (!Array.isArray(dll)) {
    context.webpackConfig.optimization.splitChunks = {
      chunks: 'all',
      name: 'vendors'
    }
    context.webpackConfig.optimization.runtimeChunk = true
  }

  const filename = hash ? '[name]-[hash].css' : '[name].css'
  const chunkFilename = hash ? '[id]-[hash].css' : '[id].css'

  plugins.push(new MiniCssExtractPlugin({ filename, chunkFilename }))

  context.webpackConfig.optimization.minimize = !!compress

  if (compress) {
    context.webpackConfig.optimization.minimizer = [
      new UglifyJsPlugin({
        uglifyOptions: {
          parse: {
            ecma: 8
          },
          compress: {
            ecma: 5,
            warnings: false,
            comparisons: false
          },
          mangle: {
            safari10: true
          },
          output: {
            ecma: 5,
            comments: false,
            ascii_only: true
          }
        },
        cache: true,
        parallel: true,
        sourceMap: false
      }),
      new OptimizeCSSAssetsPlugin()
    ]
  }

  const {
    cwd,
    outputPath,
    isDevServer,
    records = false,
    aggressive = true,
    analyzer = false
  } = context

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

  plugins.push(new IgnorePlugin(/^\.\/locale$/, /moment$/))
}
