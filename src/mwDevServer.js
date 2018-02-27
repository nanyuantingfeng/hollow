/**************************************************
 * Created by nanyuantingfeng on 23/08/2017 17:19.
 **************************************************/
import {
  HotModuleReplacementPlugin,
  NamedModulesPlugin,
} from './plugins'

import { stats } from './stats'

const DEFAULT_PORT = 8080
const DEFAULT_HOST = '127.0.0.1'

function parseProxyWithOptions(proxy, options) {
  const oo = {}
  const keys = Object.keys(proxy)
  keys.forEach(key => {
    const target = proxy[key]
    if (typeof target === 'string') {
      oo[key] = { target, ...options }
    } else {
      oo[key] = { ...target, ...options }
    }
  })
  return oo
}

export default async function (context, next) {
  context.devServer = {}
  context.proxy = {}
  context.proxyOptions = { changeOrigin: true }

  next()

  let { devServer, proxy, proxyOptions, plugins, DIRs } = context

  const proxyObj = parseProxyWithOptions(proxy, proxyOptions)

  context.webpackConfig.devServer = context.devServer = {
    port: context.port || DEFAULT_PORT,
    host: DEFAULT_HOST,
    hot: true,
    hotOnly: true,
    contentBase: DIRs.root,
    compress: true,
    disableHostCheck: true,
    overlay: true,
    headers: { 'Access-Control-Allow-Origin': '*' },
    historyApiFallback: { verbose: true, disableDotRule: false, },
    proxy: proxyObj,
    stats,

    ...devServer,
  }

  plugins.push(... [
    new HotModuleReplacementPlugin(),
    new NamedModulesPlugin(),
  ])

}
