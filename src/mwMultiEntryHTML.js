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

  let {webpackConfig, packageMap, default_node_env} = context

  let {plugins = []} = webpackConfig

  /***********************
   * copy文件到输出目录
   */

  plugins.push(new CopyWebpackPlugin(fnBuildCopyFiles(context.files)))

  /***********************
   * 配置忽略依赖
   */

  webpackConfig.externals = fnBuildExternals(context.externals)

  let env = process.env.NODE_ENV || default_node_env || 'development'

  let isDevENV = env === 'development'
  let isBetaENV = env === 'beta'

  let version = context.version || packageMap.version || '0.0.0'
  let versionTail = isBetaENV ? '-beta' : isDevENV ? '-dev' : ''

  plugins.push(new DefinePlugin({
    ['process.env.NODE_ENV']: JSON.stringify(env),
    VERSION: JSON.stringify(version),
    APPLICATION_VERSION: JSON.stringify(`v${version}${versionTail}`),
    ...context.defines
  }))

  plugins.push(new ProvidePlugin(context.provides))
  /***********************
   * 多入口配置
   */

  fnBuildHTML(context, env).forEach(line => {
    plugins.push(new HTMLWebpackPlugin(line))
  })

  webpackConfig.plugins = plugins

}
