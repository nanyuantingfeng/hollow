/**************************************************
 * Created by nanyuantingfeng on 12/06/2017 00:08.
 **************************************************/
import compose from 'koa-compose'
import path from 'path'

import {
  HotModuleReplacementPlugin,
  HtmlWebpackPlugin,
  NamedModulesPlugin
} from './webpackPlugins'

import mws from './mws'
import { processOptions } from './server-dev'

function devServer (webpackConfig, args) {

  webpackConfig.devServer = {
    contentBase: false,
    clientLogLevel: 'none',
    hot: true,
    hotOnly: true,
    inline: true,
    noInfo: true,
    quiet: false,
    host: '127.0.0.1',
    port: 9981,
    historyApiFallback: true
  }

  webpackConfig.plugins.push(... [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.join(__dirname, '../index.hbs'),
    }),
    // 开启webpack全局热更新
    new HotModuleReplacementPlugin(),
    // 当接收到热更新信号时，在浏览器console控制台打印更多可读性高的模块名称等信息
    new NamedModulesPlugin(),
  ])

  processOptions(webpackConfig, args)
}

export default function (args) {

  if (!args.cwd) {
    args.cwd = process.cwd()
  }

  return compose(mws(args))({args, cache: {}}).then(webpackConfig => {
    return devServer(webpackConfig, args)
  })
}
