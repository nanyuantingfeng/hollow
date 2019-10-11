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
import { fa } from "../test/cases/build-web-worker-ts/b";

export default async function mwPlugins(context: Context, next: Next) {
  context.plugins = [
    // new CaseSensitivePathsPlugin(),
    new ProgressPlugin(getProgressHandler),
    new IgnorePlugin(/^\.\/locale$/, /moment$/)
  ]

  next()

  const { compress, plugins, dll, ENV, aggressive = false, __IS_BUILD_LIBRARY__, optimization } = context

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
      namedChunks: ENV.isDevelopment,

      ...optimization
    }

    if (aggressive) {
      plugins.push(new AggressiveSplittingPlugin(getOptions(aggressive)))
    }
  }

  context.webpackConfig.optimization.minimize = !!compress

  if (compress) {
    context.webpackConfig.optimization.minimizer = [
      new TerserPlugin({
        exclude: [/\.min\.js$/, /\.production\.js$/, /\.umd\.js$/]
      }),
      new OptimizeCSSAssetsPlugin({
        cssProcessorOptions: {
          map: false
        }
      })
    ]
  }

  const { cwd, outputPath, records = false, analyzer = false, optimizeLodash  } = context

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
