/**************************************************
 * Created by nanyuantingfeng on 24/08/2017 18:42.
 **************************************************/
import {
  CopyWebpackPlugin,
  DefinePlugin,
  HTMLWebpackPlugin,
} from './plugins'

import {
  fnBuildCopyFiles,
  fnBuildExternals,
  fnBuildHTML,
} from './util'

export default async function (context, next) {
  next()

  let {webpackConfig, packageMap} = context

  let {plugins = []} = webpackConfig

  /***********************
   * copy文件到输出目录
   */
  if (context.files) {
    plugins.push(new CopyWebpackPlugin(fnBuildCopyFiles(context.files)))
  }

  /***********************
   * 配置忽略依赖
   */
  if (context.externals) {
    webpackConfig.externals = fnBuildExternals(context.externals)
  }

  let version = context.version || packageMap.version || '0.0.0'

  let versionTail = isBetaENV ? '-beta' : isDevENV ? '-dev' : ''

  plugins.push(new DefinePlugin({
    ['process.env.NODE_ENV']: JSON.stringify(env),
    VERSION: JSON.stringify(version),
    APPLICATION_VERSION: JSON.stringify(`v${version}${versionTail}`),
    ...context.defines
  }))

  if (context.provides) {
    plugins.push(new ProvidePlugin(context.provides))
  }

  /***********************
   * 多入口配置
   */

  fnBuildHTML(context, env).forEach(line => {
    plugins.push(new HTMLWebpackPlugin(line))
  })

  context.webpackConfig.plugins = plugins
}
