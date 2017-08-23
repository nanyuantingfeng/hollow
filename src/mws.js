/**************************************************
 * Created by nanyuantingfeng on 22/08/2017 21:57.
 **************************************************/
import path from 'path'
import fs from 'fs'
import mwBuild from './mwBuild'
import mwBabelOptions from './mwBabelOptions'
import mwPostCSSOptions from './mwPostCSSOptions'
import mwTSOptions from './mwTSOptions'
import mwWebpackConfig from './mwWebpackConfig'

function getCustomConfig (customConfigPath) {
  if (!fs.existsSync(customConfigPath)) {
    return async () => {}
  }
  return require(customConfigPath)
}

export default function (args) {

  let mwConfig = getCustomConfig(path.join(args.cwd, args.config || 'webpack.config.js'))

  return [
    mwBuild,
    mwWebpackConfig,
    mwBabelOptions,
    mwPostCSSOptions,
    mwTSOptions,
    mwConfig,
  ]
}
