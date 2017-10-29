/**************************************************
 * Created by nanyuantingfeng on 27/10/2017 16:54.
 **************************************************/
import path from 'path'

import { fnGetValueByPath } from './util'

export default async function (context, next) {
  const {default_node_env, cwd, outputPath} = context
  const env = process.env.NODE_ENV || default_node_env || 'development'

  const isProduction = env === 'production'
  const isDevelopment = env === 'development'
  const isBeta = env === 'beta'

  context.ENV = {
    isProduction,
    isDevelopment,
    isBeta,
    env,
  }

  const rootDir = cwd
  const srcDir = path.resolve(rootDir, './src')

  context.DIRs = {
    rootDir, // 项目根目录
    srcDir,// 项目业务代码根目录
    vendorDir: path.resolve(rootDir, './vendor'), // 存放所有不能用npm管理的第三方库
    dllDir: path.resolve(srcDir, './dll'),    // 源文件目录
    buildDir: path.resolve(rootDir, outputPath),    // 生成文件目录
  }

  context.packageMap = fnGetValueByPath(path.join(cwd, 'package.json'))

  next()

  return context
}
