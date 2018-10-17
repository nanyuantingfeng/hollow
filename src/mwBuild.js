/**************************************************
 * Created by nanyuantingfeng on 16/08/2017 13:10.
 **************************************************/
import path from 'path'
import { checkWebpackConfig, getNodeVersion, getBuildSourceMap } from './util'

export default async function(context, next) {
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

  const config = {
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
        '.mjs'
      ],
      alias: {
        ['@babel/runtime']: path.dirname(require.resolve('@babel/runtime/package.json')),
        ['tslib']: path.dirname(require.resolve('tslib/package.json')),
        ...alias
      },
      ...context.resolve
    },

    output: {
      filename: hash ? '[name]-[hash].js' : '[name].js',
      chunkFilename: hash ? '[name].chunk-[hash].js' : '[name].chunk.js',
      globalObject: 'this',

      devtoolModuleFilenameTemplate: info =>
        path.resolve(info.absoluteResourcePath).replace(/\\/g, '/'),

      ...output
    },

    context: context.context || cwd,
    externals: context.externals,
    node: getNodeVersion(packageMap),
    devtool: getBuildSourceMap(devtool, ENV),

    module: {
      strictExportPresence: true,
      noParse: [/moment$/],
      rules,
      unknownContextCritical
    },

    plugins: context.plugins,

    mode: 'none',

    performance: false,

    ...context.webpackConfig
  }

  const webpackConfig = (context.webpackConfig = config)

  if (outputPath) {
    webpackConfig.output.path = path.join(cwd, outputPath)
  }

  if (publicPath) {
    webpackConfig.output.publicPath = publicPath
  }

  checkWebpackConfig(webpackConfig)
}
