/**************************************************
 * Created by nanyuantingfeng on 16/08/2017 12:59.
 **************************************************/
import fs from 'fs'
import path from 'path'

export default async function (context, next) {
  const { cwd } = context

  let options = require('../tsconfig.json')
  const tsconfigPath = path.resolve(cwd, 'tsconfig.json')

  if (fs.existsSync(tsconfigPath)) {
    options = require(tsconfigPath)
  }

  context.typescriptOptions = context.tsOptions = {
    transpileOnly: true,
    happyPackMode: true,
    ...options
  }

  next()
}
