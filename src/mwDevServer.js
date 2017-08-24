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
    port: 9998,
  }

  next()

  let {plugins = [], devServer} = webpackConfig
  let {host, port} = devServer
  let uri = createDomain({port, host})

  webpackConfig.plugins = [
    new HotModuleReplacementPlugin(),
    new NamedModulesPlugin(),
    new BrowserSyncPlugin({host, port: args.port || 9999, proxy: uri}, {reload: true}),
    ...plugins,
  ]
}
