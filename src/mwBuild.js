/**************************************************
 * Created by nanyuantingfeng on 16/08/2017 13:10.
 **************************************************/
import path from 'path'
import { fnCheckWebpackConfig, fnGetNode, fnBuildSourceMap } from './util'
import { SpeedMeasurePlugin } from './plugins'

export default async function(context, next) {
  context.output = {}

  context.webpackConfig = {
    optimization: {}
  }

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
    speedMeasure = false,
    alias
  } = context

  const jsChunkFileName = hash ? '[name]-[hash].js' : '[name].js'

  let config = {
    cache: true,

    entry: context.entry || packageMap.entry,

    resolve: {
      modules: ['node_modules', path.join(__dirname, '../node_modules')],

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
        '.lazy.js',
        '.lazy.jsx',
        '.worker.js',
        '.worker.ts'
      ],

      alias: {
        '@babel/runtime': path.dirname(require.resolve('@babel/runtime/package.json')),
        tslib: path.dirname(require.resolve('tslib/package.json')),
        'react-native': 'react-native-web',
        ...alias
      },

      ...context.resolve
    },

    output: {
      filename: jsChunkFileName,
      chunkFilename: jsChunkFileName,
      globalObject: 'this',
      ...output
    },

    context: context.context || cwd,

    externals: context.externals,

    node: fnGetNode(packageMap),

    devtool: fnBuildSourceMap(devtool, ENV),

    module: {
      strictExportPresence: true,
      noParse: [/moment.js/],
      rules,
      unknownContextCritical
    },

    plugins: context.plugins,

    mode: 'none',

    ...context.webpackConfig
  }

  if (speedMeasure) {
    const smp = new SpeedMeasurePlugin()
    config = smp.wrap(config)
  }

  const webpackConfig = (context.webpackConfig = config)

  if (outputPath) {
    webpackConfig.output.path = path.join(cwd, outputPath)
  }

  if (publicPath) {
    webpackConfig.output.publicPath = publicPath
  }

  fnCheckWebpackConfig(webpackConfig)
}
