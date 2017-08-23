/**************************************************
 * Created by nanyuantingfeng on 23/08/2017 14:29.
 **************************************************/
import net from 'net'
import fs from 'fs'
import open from 'opn'
import addDevServerEntrypoints from 'webpack-dev-server/lib/util/addDevServerEntrypoints'
import { webpack } from './webpackPlugins'
import Server from 'webpack-dev-server/lib/Server'
import createDomain from 'webpack-dev-server/lib/util/createDomain'

function colorInfo (useColor, msg) {
  if (useColor)
  // Make text blue and bold, so it *pops*
    return `\u001b[1m\u001b[34m${msg}\u001b[39m\u001b[22m`
  return msg
}

function colorError (useColor, msg) {
  if (useColor)
  // Make text red and bold, so it *pops*
    return `\u001b[1m\u001b[31m${msg}\u001b[39m\u001b[22m`
  return msg
}

const defaultTo = (value, def) => !value ? def : value

const DEFAULT_PORT = 8080

const argv = {progress: true, stats: true}

export function processOptions (wpOpt) {
  // process Promise
  if (typeof wpOpt.then === 'function') {
    wpOpt.then(processOptions).catch(function (err) {
      console.error(err.stack || err)
      process.exit() // eslint-disable-line
    })
    return
  }

  const firstWpOpt = Array.isArray(wpOpt) ? wpOpt[0] : wpOpt

  const options = wpOpt.devServer || firstWpOpt.devServer || {}

  if (!options.stats) {
    options.stats = {
      cached: false,
      cachedAssets: false
    }
  }

  if (typeof options.stats === 'object' && typeof options.stats.colors === 'undefined')
    options.stats.colors = argv.color

  if (argv['lazy'])
    options.lazy = true

  if (!argv['info'])
    options.noInfo = true

  if (argv['quiet'])
    options.quiet = true

  if (argv['https'])
    options.https = true

  // Kind of weird, but ensures prior behavior isn't broken in cases
  // that wouldn't throw errors. E.g. both argv.port and options.port
  // were specified, but since argv.port is 8080, options.port will be
  // tried first instead.
  options.port = argv.port === DEFAULT_PORT
    ? defaultTo(options.port, argv.port)
    : defaultTo(argv.port, options.port)

  if (options.port) {
    startDevServer(wpOpt, options)
  }

}

function startDevServer (wpOpt, options) {
  addDevServerEntrypoints(wpOpt, options)

  let compiler
  try {
    compiler = webpack(wpOpt)
  } catch (e) {
    if (e instanceof webpack.WebpackOptionsValidationError) {
      console.error(colorError(options.stats.colors, e.message))
      process.exit(1) // eslint-disable-line
    }
    throw e
  }

  const uri = createDomain(options) + (options.inline !== false || options.lazy === true ? '/' : '/webpack-dev-server/')

  let server
  try {
    server = new Server(compiler, options)
  } catch (e) {
    const OptionsValidationError = require('webpack-dev-server/lib/OptionsValidationError')
    if (e instanceof OptionsValidationError) {
      console.error(colorError(options.stats.colors, e.message))
      process.exit(1) // eslint-disable-line
    }
    throw e
  }

  ['SIGINT', 'SIGTERM'].forEach(function (sig) {
    process.on(sig, function () {
      server.close()
      process.exit() // eslint-disable-line no-process-exit
    })
  })

  if (options.socket) {
    server.listeningApp.on('error', function (e) {
      if (e.code === 'EADDRINUSE') {
        const clientSocket = new net.Socket()
        clientSocket.on('error', function (e) {
          if (e.code === 'ECONNREFUSED') {
            // No other server listening on this socket so it can be safely removed
            fs.unlinkSync(options.socket)
            server.listen(options.socket, options.host, function (err) {
              if (err) throw err
            })
          }
        })
        clientSocket.connect({path: options.socket}, function () {
          throw new Error('This socket is already used')
        })
      }
    })
    server.listen(options.socket, options.host, function (err) {
      if (err) throw err
      const READ_WRITE = 438 // chmod 666 (rw rw rw)
      fs.chmod(options.socket, READ_WRITE, function (err) {
        if (err) throw err
        reportReadiness(uri, options)
      })
    })
  } else {
    server.listen(options.port, options.host, function (err) {
      if (err) throw err
      if (options.bonjour) broadcastZeroConf(options)
      reportReadiness(uri, options)
    })
  }
}

function reportReadiness (uri, options) {
  const useColor = argv.color
  const contentBase = Array.isArray(options.contentBase) ? options.contentBase.join(', ') : options.contentBase

  if (!options.quiet) {
    let startSentence = `Project is running at ${colorInfo(useColor, uri)}`
    if (options.socket) {
      startSentence = `Listening to socket at ${colorInfo(useColor, options.socket)}`
    }
    console.log((argv['progress'] ? '\n' : '') + startSentence)

    console.log(`webpack output is served from ${colorInfo(useColor, options.publicPath)}`)

    if (contentBase)
      console.log(`Content not from webpack is served from ${colorInfo(useColor, contentBase)}`)

    if (options.historyApiFallback)
      console.log(`404s will fallback to ${colorInfo(useColor, options.historyApiFallback.index || '/index.html')}`)

    if (options.bonjour)
      console.log('Broadcasting "http" with subtype of "webpack" via ZeroConf DNS (Bonjour)')
  }
  if (options.open) {
    open(uri + options.openPage).catch(function () {
      console.log('Unable to open browser. If you are running in a headless environment, please do not use the open flag.')
    })
  }
}

function broadcastZeroConf (options) {
  const bonjour = require('bonjour')()
  bonjour.publish({
    name: 'Webpack Dev Server',
    port: options.port,
    type: 'http',
    subtypes: ['webpack']
  })
  process.on('exit', function () {
    bonjour.unpublishAll(function () {
      bonjour.destroy()
    })
  })
}

 

