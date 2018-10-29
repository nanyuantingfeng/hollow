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

  context.typescriptOptions = context.tsOptions = {
    transpileOnly: true,
    ...options
  }

  next()
}
