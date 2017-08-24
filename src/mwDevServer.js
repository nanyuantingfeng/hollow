/**************************************************
 * Created by nanyuantingfeng on 23/08/2017 17:19.
 **************************************************/
import {
  HotModuleReplacementPlugin,
  NamedModulesPlugin,
  BrowserSyncPlugin,
} from './webpackPlugins'

import createDomain from 'webpack-dev-server/lib/util/createDomain'

function defaultTo (a, b) {
  return a ? a : b
}

const DEFAULT_PORT = 8080
const DEFAULT_HOST = '127.0.0.1'

export default async function (context, next) {
  let {webpackConfig, args} = context

  webpackConfig.devServer = {
    hot: true,
    hotOnly: true,
    contentBase: false,
    inline: true,
    noInfo: false,
    host: DEFAULT_HOST,
    port: DEFAULT_PORT,
  }

  next()

  let {plugins = [], devServer} = webpackConfig
  let {host, port} = devServer

  port = port === DEFAULT_PORT
    ? defaultTo(args.port, port)
    : defaultTo(port, args.port)

  let port0 = port
  let port1 = port + 1

  webpackConfig.devServer.port = port0

  let uri = createDomain({port: port0, host})

  webpackConfig.plugins = [
    new HotModuleReplacementPlugin(),
    new NamedModulesPlugin(),
    new BrowserSyncPlugin({host, port: port1, proxy: uri}, {reload: true}),
    ...plugins,
  ]
}
