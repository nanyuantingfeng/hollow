/**************************************************
 * Created by nanyuantingfeng on 27/10/2017 16:25.
 **************************************************/
import CaseSensitivePathsPlugin from 'case-sensitive-paths-webpack-plugin'
import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin'
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'
import LodashWebpackPlugin from 'lodash-webpack-plugin'
import TerserPlugin from 'terser-webpack-plugin'
import path from 'path'

import { ProgressPlugin, IgnorePlugin, AggressiveSplittingPlugin } from './plugins'
import { getProgressHandler, getOptions } from './util'
import { Context, Next } from './types'

export default async function mwPlugins(context: Context, next: Next) {
  context.plugins = [
    new CaseSensitivePathsPlugin(),
    new ProgressPlugin(getProgressHandler),
    new IgnorePlugin(/^\.\/locale$/, /moment$/)
  ]

  next()

  const { compress, plugins, dll, ENV, aggressive = false, __IS_BUILD_LIBRARY__ } = context

  context.webpackConfig.optimization = context.webpackConfig.optimization || {}

  if (!Array.isArray(dll)) {
    context.webpackConfig.optimization = {
      splitChunks: {
        chunks: 'all',
        name: false
      },

      // Keep the runtime chunk seperated to enable long term caching
      // https://twitter.com/wSokra/status/969679223278505985
      runtimeChunk: !__IS_BUILD_LIBRARY__,

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

    if (aggressive) {
      plugins.push(new AggressiveSplittingPlugin(getOptions(aggressive)))
    }
  }

  context.webpackConfig.optimization.minimize = !!compress

  if (compress) {
    context.webpackConfig.optimization.minimizer = [
      new TerserPlugin({
        terserOptions: {
          parse: {
            // we want terser to parse ecma 8 code. However, we don't want it
            // to apply any minfication steps that turns valid ecma 5 code
            // into invalid ecma 5 code. This is why the 'compress' and 'output'
            // sections only apply transformations that are ecma 5 safe
            // https://github.com/facebook/create-react-app/pull/4234
            ecma: 8
          },
          compress: {
            // @ts-ignore
            ecma: 5,
            warnings: false,
            // Disabled because of an issue with Uglify breaking seemingly valid code:
            // https://github.com/facebook/create-react-app/issues/2376
            // Pending further investigation:
            // https://github.com/mishoo/UglifyJS2/issues/2011
            comparisons: false,
            // Disabled because of an issue with Terser breaking valid code:
            // https://github.com/facebook/create-react-app/issues/5250
            // Pending futher investigation:
            // https://github.com/terser-js/terser/issues/120
            inline: 2
          },
          mangle: {
            safari10: true
          },
          output: {
            ecma: 5,
            comments: false,
            // Turned on because emoji and regex is not minified properly using default
            // https://github.com/facebook/create-react-app/issues/2488
            ascii_only: true
          }
        },
        // Use multi-process parallel running to improve the build speed
        // Default number of concurrent runs: os.cpus().length - 1
        parallel: true,
        // Enable file caching
        cache: true,
        sourceMap: false
      }),
      new OptimizeCSSAssetsPlugin({
        cssProcessorOptions: {
          map: false
        }
      })
    ]
  }

  const { cwd, outputPath, records = false, analyzer = false, optimizeLodash = true } = context

  context.plugins = plugins

  if (records) {
    context.webpackConfig.recordsOutputPath = path.join(cwd, outputPath, getOptions<string>(records, 'records.json'))
  }

  if (analyzer) {
    plugins.push(new BundleAnalyzerPlugin(getOptions<BundleAnalyzerPlugin.Options>(analyzer)))
  }

  if (optimizeLodash) {
    plugins.push(
      new LodashWebpackPlugin(
        getOptions<LodashWebpackPlugin.Options>(optimizeLodash, {
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
