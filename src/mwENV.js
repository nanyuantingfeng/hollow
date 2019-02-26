/**************************************************
 * Created by nanyuantingfeng on 27/10/2017 16:54.
 **************************************************/
import path from 'path'
import { DefinePlugin } from './plugins'
import { getValueByPath } from './util'

export default async function(context, next) {
  const { default_node_env, cwd, outputPath } = context
  const env = process.env.NODE_ENV || default_node_env || 'development'
  const ASSET_PATH = process.env.ASSET_PATH || ''
  context.ASSET_PATH = ASSET_PATH

  const isProduction = env === 'production'
  const isDevelopment = env === 'development'
  const isBeta = env === 'beta'

  context.ENV = {
    isProduction,
    isDevelopment,
    isBeta,
    env
  }

  const root = cwd
  const src = path.resolve(root, 'src')
  const build = path.resolve(root, outputPath)

  context.DIRs = {
    root, // 项目根目录
    cwd: root,
    src, // 项目业务代码根目录
    source: src,
    build, // 生成文件目录
    dist: build
  }

  context.packageMap = getValueByPath(path.join(cwd, 'package.json'))

  next()

  context.webpackConfig.plugins.push(
    new DefinePlugin({
      ['process.env.NODE_ENV']: JSON.stringify(env),
      ['process.env.ASSET_PATH']: JSON.stringify(ASSET_PATH)
    })
  )

  return context
}
