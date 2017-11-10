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

function parseProxyWithOptions (proxy, options) {
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

  let {devServer, proxy, proxyOptions, plugins} = context

  context.webpackConfig.devServer = context.devServer = {
    hot: true,
    hotOnly: true,
    contentBase: false,
    inline: true,
    noInfo: false,
    host: DEFAULT_HOST,
    port: context.port || DEFAULT_PORT,
    historyApiFallback: true,
    overlay: true,
    proxy: parseProxyWithOptions(proxy, proxyOptions),
    stats,
    ...devServer,
  }

  plugins.push(... [
    new HotModuleReplacementPlugin(),
    new NamedModulesPlugin(),
  ])

}
