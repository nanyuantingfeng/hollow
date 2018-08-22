/**************************************************
 * Created by nanyuantingfeng on 24/08/2017 18:42.
 **************************************************/
import { CopyWebpackPlugin, DefinePlugin, ProvidePlugin, HTMLWebpackPlugin } from './plugins'
import { fnBuildCopyFiles, fnBuildExternals, fnBuildHTML } from './util'

export default async function(context, next) {
  next()

  const { packageMap, plugins, ENV } = context

  /***********************
   * copy文件到输出目录
   */
  plugins.push(new CopyWebpackPlugin(fnBuildCopyFiles(context.files)))

  /***********************
   * 配置忽略依赖
   */
  context.externals = fnBuildExternals(context.externals)

  const version = context.version || packageMap.version || '0.0.0'
  const versionTail = ENV.isBeta ? '-beta' : ENV.isDevelopment ? '-dev' : ''

  plugins.push(
    new DefinePlugin({
      VERSION: JSON.stringify(version),
      APPLICATION_VERSION: JSON.stringify(`v${version}${versionTail}`),
      ...context.defines
    })
  )

  plugins.push(new ProvidePlugin(context.provides))

  /***********************
   * 多入口配置
   */
  fnBuildHTML(context, ENV.env).forEach(line => {
    plugins.push(new HTMLWebpackPlugin(line))
  })
}
