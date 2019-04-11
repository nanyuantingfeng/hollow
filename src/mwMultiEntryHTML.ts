/**************************************************
 * Created by nanyuantingfeng on 24/08/2017 18:42.
 **************************************************/
import HTMLWebpackPlugin from 'html-webpack-plugin'
import CopyWebpackPlugin from 'copy-webpack-plugin'

import { DefinePlugin, ProvidePlugin } from './plugins'
import { getBuildCopyFiles, getBuildExternals, getBuildHTML } from './util'
import { Context, Next } from './types'

export default async function mwMultiEntryHTML(context: Context, next: Next) {
  next()

  const { packageMap, plugins, ENV, __IS_BUILD_LIBRARY__ } = context

  if (__IS_BUILD_LIBRARY__ === true) {
    return
  }

  /***********************
   * copy文件到输出目录
   */
  plugins.push(new CopyWebpackPlugin(getBuildCopyFiles(context.files)))

  /***********************
   * 配置忽略依赖
   */
  context.externals = getBuildExternals({ ...context.files, ...context.externals } as any)

  const version = context.version || packageMap.version || '0.0.0'
  const versionTail = ENV.isBeta ? '-beta' : ENV.isDevelopment ? '-dev' : ''

  plugins.push(
    new DefinePlugin({
      VERSION: JSON.stringify(version),
      APPLICATION_VERSION: JSON.stringify(`v${version}${versionTail}`),
      ...context.defines
    }),

    new ProvidePlugin(context.provides)
  )

  /***********************
   * 多入口配置
   */
  getBuildHTML(context).forEach(line => plugins.push(new HTMLWebpackPlugin(line)))
}
