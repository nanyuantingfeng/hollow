/**************************************************
 * Created by nanyuantingfeng on 23/08/2017 14:29.
 **************************************************/
import { webpack, WebpackOptionsValidationError } from './plugins'
import { createDomain, PromiseDefer } from './util'
import Server, { Configuration } from 'webpack-dev-server'
import createLogger from 'webpack-dev-server/lib/utils/createLogger'
import { Context } from './types'
type Signals = NodeJS.Signals

function colorInfo(msg: string) {
  return `\u001b[1m\u001b[34m${msg}\u001b[39m\u001b[22m`
}

function colorError(msg: string) {
  return `\u001b[1m\u001b[31m${msg}\u001b[39m\u001b[22m`
}

process.on('unhandledRejection', err => {
  throw err
})

export function startDevServer(context: Context) {
  const { webpackConfig } = context

  const firstWpOpt = Array.isArray(webpackConfig) ? webpackConfig[0] : webpackConfig

  const options = firstWpOpt.devServer || {}

  const log = createLogger(options)

  Server.addDevServerEntrypoints(webpackConfig, options)

  let defer = PromiseDefer()

  let compiler

  try {
    compiler = webpack(webpackConfig as Configuration)
  } catch (e) {
    if (e instanceof WebpackOptionsValidationError) {
      log.error(colorError(e.message))
      process.exit(1)
    }
    defer.reject(e)
  }

  let server: Server

  try {
    // @ts-ignore
    server = new Server(compiler, options, log)
  } catch (e) {
    log.error(colorError(e.message))
    process.exit(1)
    defer.reject(e)
  }

  ;(['SIGINT', 'SIGTERM'] as Signals[]).forEach(sig => {
    process.on(sig, () => {
      server.close()
      process.exit()
    })
  })

  server.listen(options.port, options.host, (err: Error) => {
    if (err) throw err
    defer.resolve(server)
    log.info(`\nService is running at ${colorInfo(createDomain(options as any))}`)
  })

  return defer.promise
}
