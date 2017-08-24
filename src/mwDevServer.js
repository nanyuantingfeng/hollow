/**************************************************
 * Created by nanyuantingfeng on 23/08/2017 17:19.
 **************************************************/
import {
  HotModuleReplacementPlugin,
  NamedModulesPlugin,
} from './webpackPlugins'

export default async function (context, next) {
  let {webpackConfig} = context

  webpackConfig.devServer = {
    hot: true,
    noInfo: false,
    host: 'localhost',
    port: 8080,
  }

  next()

  let {plugins = []} = webpackConfig

  webpackConfig.plugins = [
    new HotModuleReplacementPlugin(),
    new NamedModulesPlugin(),
    ...plugins,
  ]
}
