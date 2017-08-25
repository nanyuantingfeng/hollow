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
import mwDevServer from './mwDevServer'
import mwMultiEntryHTML from './mwMultiEntryHTML'

function getCustomConfig (path) {
  if (!fs.existsSync(path)) {
    return async () => {}
  }
  return require(path)
}

function getCustomConfigValue (cwd, config) {
  return getCustomConfig(path.join(cwd, config || 'webpack.config.js'))
}

export function mwsBuild (cwd, config) {

  let mwConfig = getCustomConfigValue(cwd, config)

  return [
    mwBuild,
    mwWebpackConfig,
    mwMultiEntryHTML,
    mwBabelOptions,
    mwPostCSSOptions,
    mwTSOptions,
    mwConfig,
  ]
}

export function mwsDevServer (cwd, config) {
  let mwConfig = getCustomConfigValue(cwd, config)

  return [
    mwBuild,
    mwWebpackConfig,
    mwMultiEntryHTML,

    mwDevServer,

    mwBabelOptions,
    mwPostCSSOptions,
    mwTSOptions,
    mwConfig,
  ]
}
