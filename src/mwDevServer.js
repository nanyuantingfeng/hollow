/**************************************************
 * Created by nanyuantingfeng on 23/08/2017 17:19.
 **************************************************/
import {
  HotModuleReplacementPlugin,
  NamedModulesPlugin,
  BrowserSyncPlugin,
} from './plugins'

import createDomain from 'webpack-dev-server/lib/util/createDomain'

function defaultTo (a, b) {
  return a ? a : b
}

const DEFAULT_PORT = 8080
const DEFAULT_HOST = '127.0.0.1'

export default async function (context, next) {
  next()

  let {devServer, webpackConfig} = context
  let {plugins = []} = webpackConfig

  webpackConfig.devServer = devServer = {
    hot: true,
    hotOnly: true,
    contentBase: false,
    inline: true,
    noInfo: false,
    host: DEFAULT_HOST,
    port: context.port || DEFAULT_PORT,

    ...devServer,
  }

  let {host, port} = devServer

  port = port === DEFAULT_PORT
    ? defaultTo(context.port, port)
    : defaultTo(port, context.port)

  let port0 = port
  let port1 = port + 1

  devServer.port = port0

  let uri = createDomain({port: port0, host})

  webpackConfig.plugins = [
    new HotModuleReplacementPlugin(),
    new NamedModulesPlugin(),
    new BrowserSyncPlugin({
      host,
      port: port1,
      proxy: uri
    }, {reload: true}),
    
    ...plugins,
  ]

}
