/***************************************************
 * Created by nanyuantingfeng on 2019-06-25 17:12. *
 ***************************************************/
const path = require('path')
const fs = require('fs')
const log = require('webpack-log')

const env = process.env.NODE_ENV || 'development'
const isProduction = env === 'production'
const isDevelopment = env === 'development'
const isBeta = env === 'beta'

const cwd = process.cwd()
const root = cwd
const src = path.resolve(root, 'src')
const build = path.resolve(root, 'dist')

const logger = log({ name: 'HOLLOW', level: 'info' })

global.logger = {
  info(msg) {
    logger.info(colorInfo(msg))
  },
  error(msg) {
    logger.info(colorError(msg))
  }
}

global.logger.info(`NODE_ENV:${env}\n\n`)

const packageMap = getValueByPath(path.join(cwd, 'package.json'))

module.exports = {
  isProduction,
  isDevelopment,
  isBeta,
  env,

  root, // 项目根目录
  cwd: root,
  src, // 项目业务代码根目录
  source: src,
  build, // 生成文件目录
  dist: build,
  packageMap
}

function colorInfo(msg) {
  return `\u001b[1m\u001b[34m${msg}\u001b[39m\u001b[22m`
}

function colorError(msg) {
  return `\u001b[1m\u001b[31m${msg}\u001b[39m\u001b[22m`
}

function getValueByPath(path) {
  return !fs.existsSync(path) ? {} : require(path)
}
