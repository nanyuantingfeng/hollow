/**************************************************
 * Created by nanyuantingfeng on 16/08/2017 13:10.
 **************************************************/
import path from 'path'
import { checkWebpackConfig, getNodeVersion, getBuildSourceMap } from './util'
import { Context, Next } from './types'
import { Configuration } from 'webpack'
import * as webpack from 'webpack'
import merge from 'webpack-merge'
type Devtool = webpack.Options.Devtool

export default async function mwBuild(context: Context, next: Next) {
  context.output = {}
  context.webpackConfig = {}

  next()

  const {
    cwd,
    devtool,
    rules,
    ENV,
    packageMap,
    outputPath,
    publicPath,
    hash,
    output,
    unknownContextCritical = false,
    alias
  } = context

  const config: Configuration = {
    cache: true,
    entry: context.entry || packageMap.entry,
    resolve: {
      modules: ['node_modules'],
      extensions: [
        '.web.tsx',
        '.web.ts',
        '.web.jsx',
        '.web.js',
        '.ts',
        '.tsx',
        '.js',
        '.jsx',
        '.json',
        '.json5',
        '.worker.js',
        '.worker.jsx',
        '.gql',
        '.graphql',
        '.mjs'
      ],
      alias: {
        ['@babel/runtime']: path.dirname(require.resolve('@babel/runtime/package.json')),
        ['react']: path.dirname(require.resolve('react/package.json')),
        ['react-dom']: path.dirname(require.resolve('react-dom/package.json')),
        // ['react-hot-loader']: path.dirname(require.resolve('react-hot-loader/package.json')),
        ['babel-core']: path.dirname(require.resolve('babel-core/package.json')),
        ['tslib']: path.dirname(require.resolve('tslib/package.json')),
        ...alias
      },
      ...context.resolve
    },
    output: {
      filename: hash ? '[name]-[contenthash].js' : '[name].js',
      chunkFilename: hash ? '[name].chunk-[contenthash].js' : '[name].chunk.js',
      globalObject: 'this',
      pathinfo: false,
      publicPath: context.ASSET_PATH,
      ...output
    },

    context: context.context || cwd,
    externals: context.externals,
    node: getNodeVersion(packageMap),
    devtool: getBuildSourceMap(devtool, ENV) as Devtool,

    module: {
      strictExportPresence: false,
      noParse: [/moment$/],
      rules,
      unknownContextCritical
    },

    plugins: context.plugins,

    mode: 'none',

    performance: false,

    ...context.webpackConfig
  }

  const webpackConfig = (context.webpackConfig = merge(context.webpackConfig, config))

  if (outputPath) {
    webpackConfig.output.path = path.join(cwd, outputPath)
  }

  if (publicPath) {
    webpackConfig.output.publicPath = publicPath
  }

  checkWebpackConfig(webpackConfig)
}
