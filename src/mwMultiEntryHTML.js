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

  let {webpackConfig, packageMap, default_node_env, htmlWebpackPluginOptions} = context

  let env = process.env.NODE_ENV || default_node_env || 'development'

  let isProdENV = env === 'production'
  let isDevENV = env === 'development'
  let isBetaENV = env === 'beta'
  /******************
   *#source-map 编译过慢
   * production 环境不需要
   * beta 环境需要
   */
  if (webpackConfig.devtool === true) {
    webpackConfig.devtool = isProdENV ? false
      : isBetaENV ? '#source-map'
        : isDevENV ? '#inline-module-eval-source-map'
          : false
  }
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

  plugins.push(
    new DefinePlugin({
      ['process.env.NODE_ENV']: JSON.stringify(env),
      VERSION: JSON.stringify(version),
      APPLICATION_VERSION: JSON.stringify(`v${version}${versionTail}`),
      ...context.defines
    })
  )

  if (context.provides) {
    plugins.push(new ProvidePlugin(context.provides))
  }

  /***********************
   * 多入口配置
   */
  fnBuildHTML(context).forEach(line => {
    plugins.push(new HTMLWebpackPlugin(line))
  })

  context.webpackConfig.plugins = plugins

}
