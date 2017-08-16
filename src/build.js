/**************************************************
 * Created by nanyuantingfeng on 11/06/2017 05:43.
 **************************************************/
import path from 'path'
import fs from 'fs'
import compose from 'koa-compose'
import { ProgressPlugin, webpack } from './webpackPlugins'
import { chalk, notifier } from './util'

import mwBuild from './mwBuild'
import mwBabelOptions from './mwBabelOptions'
import mwPostCSSOptions from './mwPostCSSOptions'
import mwTSOptions from './mwTSOptions'
import mwWebpackConfig from './mwWebpackConfig'
import PromiseDefer from './PromiseDefer'

function build (webpackConfig, args) {

  webpackConfig = Array.isArray(webpackConfig) ? webpackConfig : [webpackConfig]

  let fileOutputPath

  webpackConfig.forEach((config) => {
    fileOutputPath = config.output.path
  })

  webpackConfig.forEach((config) => {
    config.plugins.push(
      new ProgressPlugin((percentage, msg) => {
        const stream = process.stderr
        if (stream.isTTY && percentage < 1) {
          stream.cursorTo(0)
          stream.write(`📦  ${chalk.magenta(msg)}`)
          stream.clearLine(1)
        } else if (percentage >= 1) {
          console.log(chalk.green('\nwebpack: bundle build is now finished.'))
        }
      }),
    )
  })

  let defer = PromiseDefer()

  function compileDoneHandler (err, stats) {
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
      defer.reject(err)
      process.on('exit', () => {process.exit(1)})
    }

    defer.resolve()
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
    compiler.watch(args.watch || 200, compileDoneHandler)
  } else {
    compiler.run(compileDoneHandler)
  }

  return defer.promise
}

export default function (args) {
  let mwConfig = async () => {}

  if (typeof args.config === 'function') {
    mwConfig = args.config
  }

  if (!args.cwd) {
    args.cwd = process.cwd()
  }

  let mws = [
    mwBuild,
    mwWebpackConfig,
    mwBabelOptions,
    mwPostCSSOptions,
    mwTSOptions,
    mwConfig,
  ]

  let context = {args, cache: {}}

  return compose(mws)(context).then(webpackConfig => {
    return build(webpackConfig, args)
  })
}
