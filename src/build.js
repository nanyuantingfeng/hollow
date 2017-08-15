/**************************************************
 * Created by nanyuantingfeng on 11/06/2017 05:43.
 **************************************************/
import path from 'path'
import fs from 'fs'

import {
  DefinePlugin,
  NoEmitOnErrorsPlugin,
  ProgressPlugin,
  mapJSONWebpackPlugin,
  UglifyJsPlugin,
  webpack
} from './webpackPlugins'

import { chalk, notifier } from './util'
import fnMergeCustomConfig from './fnMergeCustomConfig'
import fnGetWebpackCommonConfig from './fnGetWebpackCommonConfig'
import fnCheckWebpackConfig from './fnCheckWebpackConfig'

export function getWebpackConfig (args, cache) {
  let webpackConfig = fnGetWebpackCommonConfig(args)

  webpackConfig.plugins = webpackConfig.plugins || []

  // Config outputPath.
  if (args.outputPath) {
    webpackConfig.output.path = args.outputPath
  }

  if (args.publicPath) {
    webpackConfig.output.publicPath = args.publicPath
  }

  // Watch mode should not use UglifyJsPlugin
  if (args.compress && !args.watch) {
    let UglifyJsPluginConfig = {
      output: {
        ascii_only: true,
      },
      compress: {
        warnings: false,
      },
    }
    webpackConfig.plugins = [
      ...webpackConfig.plugins,
      new UglifyJsPlugin(UglifyJsPluginConfig),
      new DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production'),
      }),
    ]
  } else {
    webpackConfig.plugins = [
      ...webpackConfig.plugins,
      new DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      }),
    ]
  }

  webpackConfig.plugins = [
    ...webpackConfig.plugins,
    new NoEmitOnErrorsPlugin(),
  ]

  // Output map.json if hash.
  if (args.hash) {
    const pkg = require(path.join(args.cwd, 'package.json'))
    webpackConfig.output.filename = '[name]-[chunkhash].js'
    webpackConfig.output.chunkFilename = '[name]-[chunkhash].js'
    webpackConfig.plugins = [
      ...webpackConfig.plugins,
      mapJSONWebpackPlugin({
        assetsPath: pkg.name,
        cache,
      }),
    ]
  }

  if (typeof args.config === 'function') {
    webpackConfig = args.config(webpackConfig) || webpackConfig
  } else {
    webpackConfig = fnMergeCustomConfig(
      webpackConfig,
      path.resolve(args.cwd, args.config || 'webpack.config.js'))
  }

  fnCheckWebpackConfig(webpackConfig)

  return webpackConfig
}

export default function (args, callback) {

  let webpackConfig = getWebpackConfig(args, {})

  webpackConfig = Array.isArray(webpackConfig) ? webpackConfig : [webpackConfig]

  let fileOutputPath

  webpackConfig.forEach((config) => {
    fileOutputPath = config.output.path
  })

  webpackConfig.forEach((config) => {
    config.plugins.push(
      new ProgressPlugin((percentage, msg) => {
        const stream = process.stderr
        if (stream.isTTY && percentage < 0.71) {
          stream.cursorTo(0)
          stream.write(`📦  ${chalk.magenta(msg)}`)
          stream.clearLine(1)
        } else if (percentage === 1) {
          console.log(chalk.green('\nwebpack: bundle build is now finished.'))
        }
      }),
    )
  })

  function doneHandler (err, stats) {
    if (args.json) {
      const filename = typeof args.json === 'boolean' ? 'build-bundle.json' : args.json
      const jsonPath = path.join(fileOutputPath, filename)
      fs.writeFileSync(jsonPath, JSON.stringify(stats.toJson()), 'utf-8')
      console.log(`Generate JSON File: ${jsonPath}`)
    }

    const {errors} = stats.toJson()
    if (errors && errors.length) {
      process.on('exit', () => {
        process.exit(1)
      })
    }

    // if watch enabled only stats.hasErrors would log info
    // otherwise  would always log info
    if (!args.watch || stats.hasErrors()) {
      const buildInfo = stats.toString({
        colors: true,
        children: true,
        chunks: !!args.verbose,
        modules: !!args.verbose,
        chunkModules: !!args.verbose,
        hash: !!args.verbose,
        version: !!args.verbose,
      })
      if (stats.hasErrors()) {
        console.error(buildInfo)
      } else {
        console.log(buildInfo)
        notifier.notify({
          title: 'hollow cli',
          message: 'done',
          subtitle: 'build successfully',
          contentImage: path.join(__dirname, '../assets/success.png'),
          sound: 'Glass',
        })
      }
    }

    if (err) {
      process.on('exit', () => {
        process.exit(1)
      })
      console.error(err)
    }

    if (callback) {
      callback(err)
    }
  }

  // Run compiler.
  let compiler = webpack(webpackConfig)

  // Hack: remove extract-text-webpack-plugin log
  if (!args.verbose) {
    compiler.plugin('done', (stats) => {
      stats.stats.forEach((stat) => {
        stat.compilation.children = stat.compilation.children.filter((child) => {
          return child.name !== 'extract-text-webpack-plugin'
        })
      })
    })
  }

  if (args.watch) {
    compiler.watch(args.watch || 200, doneHandler)
  } else {
    compiler.run(doneHandler)
  }
}
