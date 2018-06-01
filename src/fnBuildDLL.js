/**************************************************
 * Created by nanyuantingfeng on 11/06/2017 05:43.
 **************************************************/
import compose from 'koa-compose'

import { mwsDLL } from './mws'
import startBuild from './buildCore'

export function createBuildDLLContext(args) {
  const context = {
    cwd: process.cwd(),
    files: {},
    externals: {},
    sdks: {},
    provides: {},
    defines: {},
    outputPath: 'dll',
    default_node_env: 'production',
    cache: {},
    ...args,
  }

  const { cwd, config } = context

  return compose(mwsDLL(cwd, config))(context)
}

export default function (args) {
  return createBuildDLLContext(args)
    .then(startBuild)
    .catch(e => {
      //throw e
      console.error(e)
    })
}
