/**************************************************
 * Created by nanyuantingfeng on 16/08/2017 13:10.
 **************************************************/
import path from 'path'
import { fnCheckWebpackConfig, fnGetNode, fnBuildSourceMap, } from './util'

export default async function (context, next) {
  context.output = {}
  context.webpackConfig = {
    optimization: {}
  }

  next()

  const {
          cwd, devtool, rules, ENV, packageMap,
          outputPath, publicPath, hash, output,
          unknownContextCritical = false,
        } = context

  const jsChunkFileName = hash ? '[hash]-[name].js' : '[name].js'
  const webpackConfig = context.webpackConfig = {

    cache: true,

    entry: context.entry || packageMap.entry,

    resolve: {
      modules: ['node_modules', path.join(__dirname, '../node_modules')],
      extensions: [
        '.web.tsx', '.web.ts', '.web.jsx', '.web.js',
        '.ts', '.tsx', '.js', '.jsx',
        '.json',
        '.lazy.js', '.lazy.jsx',
        '.worker.js', '.worker.ts'
      ],
    },

    output: {
      filename: jsChunkFileName,
      chunkFilename: jsChunkFileName,
      ...output,
    },

    context: context.context || cwd,

    externals: context.externals,

    node: fnGetNode(packageMap),

    devtool: fnBuildSourceMap(devtool, ENV),

    module: {
      noParse: [/moment.js/],
      rules,
      unknownContextCritical,
    },

    plugins: context.plugins,

    ...context.webpackConfig,
  }

  if (outputPath) {
    webpackConfig.output.path = path.join(cwd, outputPath)
  }

  if (publicPath) {
    webpackConfig.output.publicPath = publicPath
  }

  fnCheckWebpackConfig(webpackConfig)

}

