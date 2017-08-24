/**************************************************
 * Created by nanyuantingfeng on 23/08/2017 14:29.
 **************************************************/
import addDevServerEntrypoints from 'webpack-dev-server/lib/util/addDevServerEntrypoints'
import { webpack, WebpackOptionsValidationError } from './webpackPlugins'
import createDomain from 'webpack-dev-server/lib/util/createDomain'
import Server from 'webpack-dev-server'
import PromiseDefer from './PromiseDefer'

function colorInfo (useColor, msg) {
  if (useColor)
    return `\u001b[1m\u001b[34m${msg}\u001b[39m\u001b[22m`
  return msg
}

function colorError (useColor, msg) {
  if (useColor)
    return `\u001b[1m\u001b[31m${msg}\u001b[39m\u001b[22m`
  return msg
}

export function processOptions (wpOpt) {

  if (typeof wpOpt.then === 'function') {
    wpOpt.then(processOptions).catch(function (err) {
      console.error(err.stack || err)
      process.exit()
    })
    return
  }

  const firstWpOpt = Array.isArray(wpOpt) ? wpOpt[0] : wpOpt

  const options = wpOpt.devServer || firstWpOpt.devServer || {}

  if (!options.stats) {
    options.stats = {
      colors: true,
      cached: false,
      cachedAssets: false
    }
  }

  return startDevServer(wpOpt, options)
}

function startDevServer (wpOpt, options) {
  addDevServerEntrypoints(wpOpt, options)

  let defer = PromiseDefer()

  let compiler

  try {
    compiler = webpack(wpOpt)
  } catch (e) {
    if (e instanceof WebpackOptionsValidationError) {
      console.error(colorError(options.stats.colors, e.message))
      process.exit(1)
    }
    defer.reject(e)
  }

  const uri = createDomain(options) + (options.inline !== false || options.lazy === true ? '/' : '/webpack-dev-server/')

  let server

  try {
    server = new Server(compiler, options)
  } catch (e) {
    const OptionsValidationError = require('webpack-dev-server/lib/OptionsValidationError')
    if (e instanceof OptionsValidationError) {
      console.error(colorError(options.stats.colors, e.message))
      process.exit(1)
    }
    defer.reject(e)
  }

  ['SIGINT', 'SIGTERM'].forEach(function (sig) {
    process.on(sig, function () {
      server.close()
      process.exit()
    })
  })

  server.listen(options.port, options.host, function (err) {
    if (err) throw err
    defer.resolve(server)
    reportReadiness(uri, options)
  })

  return defer.promise
}

function reportReadiness (uri, options) {
  const useColor = true

  const contentBase = Array.isArray(options.contentBase)
    ? options.contentBase.join(', ') : options.contentBase

  if (!options.quiet) {
    console.info(`Project is running at ${
      colorInfo(useColor, uri)}`)

    console.info(`webpack output is served from ${
      colorInfo(useColor, options.publicPath)}`)

    if (contentBase)
      console.info(`Content not from webpack is served from ${
        colorInfo(useColor, contentBase)}`)

    if (options.historyApiFallback)
      console.info(`404s will fallback to ${
        colorInfo(useColor, options.historyApiFallback.index || '/index.html')}`)
  }

}
