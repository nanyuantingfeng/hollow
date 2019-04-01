/**************************************************
 * Created by nanyuantingfeng on 23/08/2017 17:29.
 **************************************************/
import path from 'path'
import { webpack } from './plugins'
import { notifier, PromiseDefer } from './util'
import getStats from './getStats'
import { Context } from './types'

process.on('unhandledRejection', err => {
  throw err
})

export default function buildCore(context: Context): Promise<Context> {
  let { webpackConfig } = context

  webpackConfig = Array.isArray(webpackConfig) ? webpackConfig : [webpackConfig]

  let fileOutputPath

  webpackConfig.forEach((config: any) => {
    fileOutputPath = config.output.path
  })

  const defer = PromiseDefer<Context>()

  function compileDoneHandler(err: Error, stats: any) {
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
          subtitle: `SUCCESSFULLY`,
          message: `TIME: ${stats.stats[0].endTime - stats.stats[0].startTime}ms`,
          contentImage: path.join(__dirname, '../assets/success.png'),
          sound: true
        })
      }
    }

    defer.resolve()
  }

  const compiler: any = webpack(webpackConfig)

  if (!context.verbose) {
    compiler.hooks.done.tap('mini-css-extract-plugin', (stats: any) => {
      stats.stats.forEach((stat: any) => {
        stat.compilation.children = stat.compilation.children.filter(
          (child: any) => !child.name.startsWith('mini-css-extract-plugin')
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
