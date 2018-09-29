/**************************************************
 * Created by nanyuantingfeng on 27/10/2017 16:25.
 **************************************************/
import path from 'path'

import {
  FriendlyErrorsWebpackPlugin,
  ProgressPlugin,
  AggressiveSplittingPlugin,
  UglifyJsPlugin,
  OptimizeCSSAssetsPlugin,
  BundleAnalyzerPlugin,
  IgnorePlugin,
  LodashWebpackPlugin
} from './plugins'

import { notifier, fnProgressHandler, getOptions } from './util'

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
    new ProgressPlugin(fnProgressHandler)
  ]

  next()

  const { compress, plugins, dll, ENV } = context

  if (!Array.isArray(dll)) {
    context.webpackConfig.optimization = {
      splitChunks: {
        chunks: 'all',
        cacheGroups: {
          default: false,
          vendors: false,
          vendor: {
            test: /node_modules/,
            name: 'vendor',
            chunks: 'initial',
            enforce: true
          },
          common: {
            name: 'common',
            chunks: 'all',
            minChunks: 3,
            reuseExistingChunk: true,
            enforce: true
          },
          styles: {
            name: 'styles',
            chunks: 'all',
            test: /\.css$/,
            enforce: true,
            priority: 50
          }
        }
      },

      runtimeChunk: false,

      //common
      removeAvailableModules: true,
      removeEmptyChunks: true,
      mergeDuplicateChunks: true,

      // must be false
      sideEffects: false,

      //
      flagIncludedChunks: true,
      occurrenceOrder: true,
      concatenateModules: true,

      //
      usedExports: true,
      providedExports: true,
      noEmitOnErrors: true,
      namedModules: ENV.isDevelopment,
      namedChunks: ENV.isDevelopment
    }
  }

  context.webpackConfig.optimization.minimize = !!compress

  if (compress) {
    context.webpackConfig.optimization.minimizer = [
      new UglifyJsPlugin({
        uglifyOptions: {
          output: {
            comments: false // remove comments
          },
          compress: {
            unused: true,
            dead_code: true, // big one--strip code that will never execute
            warnings: false, // good for prod apps so users can't peek behind curtain
            drop_debugger: true,
            conditionals: true,
            evaluate: true,
            drop_console: true, // strips console statements
            sequences: true,
            booleans: true
          }
        },
        cache: true,
        parallel: true,
        sourceMap: false
      }),
      new OptimizeCSSAssetsPlugin({})
    ]
  }

  const {
    cwd,
    outputPath,
    records = false,
    aggressive = true,
    analyzer = false,
    optimizeLodash = true
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

  if (optimizeLodash) {
    plugins.push(
      new LodashWebpackPlugin(
        getOptions(optimizeLodash, {
          shorthands: true,
          paths: true,
          cloning: true,
          flattening: true,
          exotics: true,
          collections: true,
          caching: true
        })
      )
    )
  }
}
