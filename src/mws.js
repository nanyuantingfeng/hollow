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
import mwDLL from './mwDLL'
import mwPWA from './mwPWA'

async function noop() {}

function getCustomConfig(cwd, config) {
  if ('function' === typeof config) {
    return config
  }

  let paths = []

  switch (process.env.NODE_ENV) {
    case 'production':
      paths.push(...['build', 'production', 'prod'])
      break
    case 'development':
      paths.push(...['development', 'develop', 'dev'])
      break
    case 'beta':
      paths.push(...['beta', 'build', 'production', 'prod', 'development', 'develop', 'dev'])
      break
    default:
      paths.push(process.env.NODE_ENV)
      break
  }

  paths.push('config')
  paths = paths.map(name => `webpack.${name}.js`)

  config && paths.unshift(config)

  let cc = noop
  let i = -1
  while (++i < paths.length) {
    let p = paths[i]
    let pp = path.join(cwd, p)
    if (fs.existsSync(pp)) {
      console.log(`>>> ${pp}`)
      cc = require(pp)
      break
    }
  }

  return cc
}

export function mwsBuild(cwd, config) {
  const mwConfig = getCustomConfig(cwd, config)

  return [
    mwENV,
    mwBuild,
    mwPWA,
    mwMultiEntryHTML,
    mwDLL,
    mwPlugins,
    mwRules,
    mwBabelOptions,
    mwPostCSSOptions,
    mwTSOptions,
    mwConfig
  ]
}

export function mwsDevServer(cwd, config) {
  const mwConfig = getCustomConfig(cwd, config)

  return [
    mwENV,
    mwBuild,
    mwPWA,
    mwMultiEntryHTML,
    mwDLL,
    mwPlugins,
    mwRules,
    mwBabelOptions,
    mwPostCSSOptions,
    mwTSOptions,
    mwDevServer,
    mwConfig
  ]
}

export function mwsDLL(cwd, config) {
  const mwConfig = getCustomConfig(cwd, config)
  return [
    mwENV,
    mwBuild,
    mwDLL,
    mwPlugins,
    mwRules,
    mwBabelOptions,
    mwPostCSSOptions,
    mwTSOptions,
    mwConfig
  ]
}
