/**************************************************
 * Created by nanyuantingfeng on 22/08/2017 21:57.
 **************************************************/

import mwBuild from './mwBuild'
import mwBabelOptions from './mwBabelOptions'
import mwPostCSSOptions from './mwPostCSSOptions'
import mwTSOptions from './mwTSOptions'
import mwWebpackConfig from './mwWebpackConfig'

export default function (mws = []) {

  if (!Array.isArray(mws)) {
    mws = [mws]
  }

  return [
    mwBuild,
    mwWebpackConfig,
    mwBabelOptions,
    mwPostCSSOptions,
    mwTSOptions,
    ...mws,
  ]
}
