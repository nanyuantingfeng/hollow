/**************************************************
 * Created by nanyuantingfeng on 27/10/2017 16:54.
 **************************************************/
import path from 'path'

import { fnGetValueByPath } from './util'

export default async function (context, next) {

  const {default_node_env, cwd} = context
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
  const publicDir = path.resolve(srcDir, './public-resource')

  context.DIRs = {
    // 项目根目录
    rootDir,

    // 项目业务代码根目录
    srcDir,

    // 存放各个页面使用到的公共资源
    publicDir,

    // 存放所有不能用npm管理的第三方库
    vendorDir: path.resolve(rootDir, './vendor'),

    // 源文件目录
    dllDir: path.resolve(srcDir, './dll'),

    // 与业务逻辑无关的库都可以放到这里
    libsDir: path.resolve(publicDir, './libs'),

    // 存放组件，可以是纯HTML，也可以包含js/css/image等，看自己需要
    componentsDir: path.resolve(publicDir, './components'),

    // 生成文件目录
    buildDir: path.resolve(rootDir, './build'),
  }

  context.packageMap = fnGetValueByPath(path.join(cwd, 'package.json'))

  next()

  return context
}
