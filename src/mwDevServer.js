/**************************************************
 * Created by nanyuantingfeng on 23/08/2017 17:19.
 **************************************************/
import path from 'path'
import {
  HtmlWebpackPlugin,
  HotModuleReplacementPlugin,
  NamedModulesPlugin
} from './webpackPlugins'

export default async function (context, next) {
  let {webpackConfig} = context

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

  let {plugins} = webpackConfig

  plugins = plugins || []

  plugins.push(...[
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.join(__dirname, '../index.hbs'),
    }),
    new HotModuleReplacementPlugin(),
    new NamedModulesPlugin()
  ])

  webpackConfig.plugins = plugins

  next()
}
