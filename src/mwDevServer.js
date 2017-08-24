/**************************************************
 * Created by nanyuantingfeng on 23/08/2017 17:19.
 **************************************************/
import {
  HotModuleReplacementPlugin,
  NamedModulesPlugin,
  BrowserSyncPlugin,
} from './webpackPlugins'

import createDomain from 'webpack-dev-server/lib/util/createDomain'

export default async function (context, next) {
  let {webpackConfig, args} = context

  webpackConfig.devServer = {
    hot: true,
    hotOnly: true,
    contentBase: false,
    inline: true,
    noInfo: false,
    host: '127.0.0.1',
    port: 8080,
  }

  next()

  let {plugins = [], devServer} = webpackConfig
  let {host, port} = devServer

  let port0 = port
  let port1 = port + 1

  if (args.port) {
    port1 = args.port
    port0 = args.port - 1
  }

  webpackConfig.devServer.port = port0

  let uri = createDomain({port: port0, host})

  webpackConfig.plugins = [
    new HotModuleReplacementPlugin(),
    new NamedModulesPlugin(),
    new BrowserSyncPlugin({host, port: port1, proxy: uri}, {reload: true}),
    ...plugins,
  ]
}
