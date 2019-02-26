/**************************************************
 * Created by nanyuantingfeng on 16/08/2017 12:59.
 **************************************************/
import fs from 'fs'
import path from 'path'

export default async function(context, next) {
  const { cwd, ENV } = context

  let typescriptConfigPath = path.join(__dirname, '../tsconfig.json')
  let options = require(typescriptConfigPath)
  const tsconfigPath = path.resolve(cwd, 'tsconfig.json')

  if (fs.existsSync(tsconfigPath)) {
    options = require(tsconfigPath)
  }

  options.compilerOptions.sourceMap = ENV.isDevelopment
  // 因为在后面 ts-loader 里面修正了 babel-loader 的链式调用,
  // 所以这边使用的 `module='esnext'` 使其不处理导出方式
  options.compilerOptions.target = 'esnext'
  options.compilerOptions.module = 'esnext'

  context.typescriptOptions = context.tsOptions = {
    transpileOnly: true,
    experimentalWatchApi: true,
    compilerOptions: options.compilerOptions
  }

  next()
}
