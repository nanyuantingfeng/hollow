/**************************************************
 * Created by nanyuantingfeng on 23/08/2017 17:19.
 **************************************************/
import path from 'path'
import {
  HtmlWebpackPlugin,
  HotModuleReplacementPlugin,
  NamedModulesPlugin,
} from './webpackPlugins'

export default async function (context, next) {
  let {webpackConfig} = context

  webpackConfig.devServer = {
    contentBase: false,
    clientLogLevel: 'none',
    hot: true,
    noInfo: false,
    quiet: false,
    host: '127.0.0.1',
    port: 8080,
  }
  next()

  let {htmlWebpackPluginOptions} = context
  let {plugins = []} = webpackConfig

  plugins.push(...[

    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.join(__dirname, '../index.hbs'),
      ...htmlWebpackPluginOptions,
    }),
    new HotModuleReplacementPlugin(),
    new NamedModulesPlugin()
  ])

  webpackConfig.plugins = plugins

}
