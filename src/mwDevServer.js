/**************************************************
 * Created by nanyuantingfeng on 23/08/2017 17:19.
 **************************************************/
import {
  HotModuleReplacementPlugin,
  NamedModulesPlugin,
  BrowserSyncPlugin,
} from './plugins'
import { createDomain } from './util'

function defaultTo (a, b) {
  return a ? a : b
}

const DEFAULT_PORT = 8080
const DEFAULT_HOST = '127.0.0.1'

function parseProxy (proxy, options) {
  const oo = {}
  const keys = Object.keys(proxy)
  keys.forEach(key => {
    const target = proxy[key]
    if (typeof target === 'string') {
      oo[key] = {target, ...options}
    } else {
      oo[key] = {...target, ...options}
    }
  })
  return oo
}

export default async function (context, next) {
  context.devServer = {}
  context.proxy = {}
  context.proxyOptions = {changeOrigin: true}

  next()

  let {
    devServer, webpackConfig,
    browserSyncOptions = false,
    proxy,
    proxyOptions,
  } = context

  let {plugins = []} = webpackConfig

  let {host, port} = devServer = webpackConfig.devServer = {
    hot: true,
    hotOnly: true,
    contentBase: false,
    inline: true,
    noInfo: false,
    host: DEFAULT_HOST,
    port: context.port || DEFAULT_PORT,
    historyApiFallback: true,
    overlay: true,
    proxy: parseProxy(proxy, proxyOptions),
    ...devServer,
  }

  webpackConfig.devServer.port = port = (port === DEFAULT_PORT)
    ? defaultTo(context.port, port)
    : defaultTo(port, context.port)

  plugins.push(... [
    new HotModuleReplacementPlugin(),
    new NamedModulesPlugin(),
  ])

  if (browserSyncOptions !== false) {
    plugins.push(new BrowserSyncPlugin({
      host,
      port: port + 1,
      proxy: createDomain(devServer),
      open: false,
      ...browserSyncOptions,
    }, {reload: true}))
  }

  webpackConfig.plugins = plugins
}
