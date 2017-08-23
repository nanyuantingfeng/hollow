/**************************************************
 * Created by nanyuantingfeng on 23/08/2017 17:29.
 **************************************************/
import path from 'path'
import fs from 'fs'
import { webpack } from './webpackPlugins'
import { notifier } from './util'
import PromiseDefer from './PromiseDefer'

export default function (webpackConfig, args) {

  webpackConfig = Array.isArray(webpackConfig) ? webpackConfig : [webpackConfig]

  let fileOutputPath

  webpackConfig.forEach((config) => {
    fileOutputPath = config.output.path
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
