/**************************************************
 * Created by nanyuantingfeng on 23/08/2017 17:19.
 **************************************************/
import {
  HotModuleReplacementPlugin,
  NamedModulesPlugin,
  BrowserSyncPlugin,
} from './plugins'

function defaultTo (a, b) {
  return a ? a : b
}

function createDomain (obj) {
  const {port, host} = obj
  return `http://${host}:${port}`
}

const DEFAULT_PORT = 8080
const DEFAULT_HOST = '127.0.0.1'

export default async function (context, next) {
  context.devServer = {}

  next()

  let {devServer, webpackConfig, browserSyncOptions = {}} = context

  let {plugins = []} = webpackConfig

  let {host, port} = webpackConfig.devServer = {
    hot: true,
    hotOnly: true,
    contentBase: false,
    inline: true,
    noInfo: false,
    host: DEFAULT_HOST,
    port: context.port || DEFAULT_PORT,
    ...devServer,
  }

  port = (port === DEFAULT_PORT)
    ? defaultTo(context.port, port)
    : defaultTo(port, context.port)

  let port0 = port + 1
  let port1 = port

  webpackConfig.devServer.port = port0
  const uri = createDomain({port: port0, host})

  plugins.push(... [
    new HotModuleReplacementPlugin(),
    new NamedModulesPlugin(),
  ])

  if (browserSyncOptions !== false) {
    plugins.push(new BrowserSyncPlugin({
      host,
      port: port1,
      proxy: uri,
      ...browserSyncOptions,
    }, {reload: true}))
  }

  webpackConfig.plugins = plugins
}
