/**************************************************
 * Created by nanyuantingfeng on 16/08/2017 12:59.
 **************************************************/
import fs from 'fs'
import path from 'path'
/*import tsImportPluginFactory from 'ts-import-plugin'*/
import { getTransformer } from 'ts-transform-graphql-tag'
import { Context, Next } from './types'

export default async function(context: Context, next: Next) {
  const { cwd, ENV } = context

  let typescriptConfigPath = path.join(__dirname, '../tsconfig.json')
  let options = require(typescriptConfigPath)
  const tsconfigPath = path.resolve(cwd, 'tsconfig.json')

  if (fs.existsSync(tsconfigPath)) {
    options = require(tsconfigPath)
  }

  options.compilerOptions.sourceMap = ENV.isDevelopment
  // 因为在后面 ts-loader 里面修正了 babel-loader 的链式调用,
  // 所以这边使用的 `module='ESNEXT'` 使其不处理导出方式
  options.compilerOptions.module = 'ESNEXT'

  context.typescriptOptions = context.tsOptions = {
    transpileOnly: true,
    experimentalWatchApi: true,
    compilerOptions: options.compilerOptions
  }

  next()

  const { /*importPluginOptions,*/ useGQL = true } = context

  context.tsOptions.getCustomTransformers = () => {
    const before: any[] = []

    if (useGQL) {
      before.push(getTransformer())
    }

    /* if (importPluginOptions) {
       before.push(...importPluginOptions.map(o => tsImportPluginFactory(o)))
    }*/

    return { before }
  }
}
