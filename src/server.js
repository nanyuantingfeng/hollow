/**************************************************
 * Created by nanyuantingfeng on 12/06/2017 00:08.
 **************************************************/
import { HotModuleReplacementPlugin, HtmlWebpackPlugin, NamedModulesPlugin } from './webpackPlugins'
import { getWebpackConfig } from './build'

export default function (args) {

  let webpackConfig = getWebpackConfig(args, {})

  webpackConfig.devServer = {
    contentBase: false,
    hot: true,
    noInfo: false,
    host: '0.0.0.0',
    inline: true,
    historyApiFallback: true
  }

  webpackConfig.plugins.push(... [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html'
    }),

    // 开启webpack全局热更新
    new HotModuleReplacementPlugin(),
    // 当接收到热更新信号时，在浏览器console控制台打印更多可读性高的模块名称等信息
    new NamedModulesPlugin(),
  ])
}
