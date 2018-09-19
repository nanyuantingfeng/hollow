/**************************************************
 * Created by nanyuantingfeng on 23/08/2017 17:29.
 **************************************************/
import path from 'path'
import { webpack } from './plugins'
import { notifier } from './util'
import PromiseDefer from './PromiseDefer'
import getStats from './getStats'

process.on('unhandledRejection', err => {
  throw err
})

export default function(context) {
  let { webpackConfig } = context

  webpackConfig = Array.isArray(webpackConfig) ? webpackConfig : [webpackConfig]

  let fileOutputPath

  webpackConfig.forEach(config => {
    fileOutputPath = config.output.path
  })

  let defer = PromiseDefer()

  function compileDoneHandler(err, stats) {
    if (err) {
      console.error(err)
      defer.reject(err)
      process.on('exit', () => {
        process.exit(1)
      })
    }

    if (!stats) {
      defer.resolve()
      return
    }

    try {
      const { errors } = stats.toJson()
      if (errors && errors.length) {
        process.on('exit', () => {
          process.exit(1)
        })
      }
    } catch (e) {
      console.error(e)
      process.on('exit', () => {
        process.exit(1)
      })
    }

    if (!context.watch || stats.hasErrors()) {
      const buildInfo = stats.toString(getStats(context.verbose))
      if (stats.hasErrors()) {
        console.error(buildInfo)
      } else {
        console.log(buildInfo)
        notifier.notify({
          title: 'HOLLOW CLI',
          message: 'DONE',
          subtitle: 'build successfully',
          contentImage: path.join(__dirname, '../assets/success.png'),
          sound: 'Glass'
        })
      }
    }

    defer.resolve()
  }

  let compiler = webpack(webpackConfig)

  if (!context.verbose) {
    compiler.hooks.done.tap('mini-css-extract-plugin', stats => {
      stats.stats.forEach(stat => {
        stat.compilation.children = stat.compilation.children.filter(
          child => !child.name.startsWith('mini-css-extract-plugin')
        )
      })
    })
  }

  if (context.watch) {
    compiler.watch(context.watch || 200, compileDoneHandler)
  } else {
    compiler.run(compileDoneHandler)
  }

  return defer.promise
}
