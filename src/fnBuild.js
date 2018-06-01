/**************************************************
 * Created by nanyuantingfeng on 11/06/2017 05:43.
 **************************************************/
import compose from 'koa-compose'
import { mwsBuild } from './mws'
import startBuild from './buildCore'

export function createBuildContext(args) {

  const context = {
    cwd: process.cwd(),
    files: {},
    externals: {},
    sdks: {},
    provides: {},
    defines: {},
    outputPath: 'dist',
    default_node_env: 'production',
    cache: {},
    ...args,
  }

  const { cwd, config } = context
  return compose(mwsBuild(cwd, config))(context)
}

export default function (args) {
  return createBuildContext(args)
    .then(startBuild)
    .catch(e => {
      // throw e
      console.error(e)
    })
}
