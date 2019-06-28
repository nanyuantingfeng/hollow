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
import mwCDN from './mwCDN'
import { Middleware } from 'koa-compose'
import { Context } from './types'
import merge from 'webpack-merge'

async function noop() {}

function getCustomConfig(cwd: string, config: Function | string): Middleware<Context> {
  if ('function' === typeof config) {
    return config as Middleware<Context>
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
      console.info(`${pp}`)
      cc = require(pp)
      break
    }
  }

  if ('function' === typeof cc) {
    return cc
  }

  if ('object' === typeof cc) {
    return async ctx => {
      ctx.webpackConfig = merge(ctx.webpackConfig, cc as any)
      if ((cc as any).target && (cc as any).output.libraryTarget) {
        ctx.__IS_BUILD_LIBRARY__ = true
      }
    }
  }

  return null
}

export function mwsBuild(cwd: string, config: Function | string): Middleware<Context>[] {
  const mwConfig = getCustomConfig(cwd, config)

  return [
    mwENV,
    mwBuild,
    mwPWA,
    mwCDN,
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

export function mwsDevServer(cwd: string, config: Function | string): Middleware<Context>[] {
  const mwConfig = getCustomConfig(cwd, config)

  return [
    mwENV,
    mwBuild,
    mwPWA,
    mwCDN,
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

export function mwsDLL(cwd: string, config: Function | string): Middleware<Context>[] {
  const mwConfig = getCustomConfig(cwd, config)
  return [mwENV, mwBuild, mwDLL, mwPlugins, mwRules, mwBabelOptions, mwPostCSSOptions, mwTSOptions, mwConfig]
}
