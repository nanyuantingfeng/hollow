/**************************************************
 * Created by nanyuantingfeng on 22/08/2017 21:57.
 **************************************************/
import path from 'path'
import fs from 'fs'
import mwBuild from './mwBuild'
import mwBabelOptions from './mwBabelOptions'
import mwPostCSSOptions from './mwPostCSSOptions'
import mwTSOptions from './mwTSOptions'
import mwDevServer from './mwDevServer'
import mwMultiEntryHTML from './mwMultiEntryHTML'
import mwPlugins from './mwPlugins'
import mwRules from './mwRules'
import mwENV from './mwENV'

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

  const mwConfig = getCustomConfigValue(cwd, config)

  return [
    mwENV,
    mwBuild,
    mwPlugins,
    mwRules,
    mwMultiEntryHTML,
    mwBabelOptions,
    mwPostCSSOptions,
    mwTSOptions,
    mwConfig,
  ]
}

export function mwsDevServer (cwd, config) {
  const mwConfig = getCustomConfigValue(cwd, config)

  return [
    mwENV,
    mwBuild,
    mwPlugins,
    mwRules,
    mwMultiEntryHTML,
    mwBabelOptions,
    mwPostCSSOptions,
    mwTSOptions,
    mwDevServer,
    mwConfig,
  ]
}
