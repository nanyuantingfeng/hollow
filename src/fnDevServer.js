/**************************************************
 * Created by nanyuantingfeng on 12/06/2017 00:08.
 **************************************************/
import compose from 'koa-compose'

import { mwsDevServer } from './mws'
import { startDevServer } from './devServerCore'

export function createDevServerContext(args) {
  const context = {
    cwd: process.cwd(),
    files: {},
    externals: {},
    sdks: {},
    provides: {},
    defines: {},
    outputPath: 'dist',
    default_node_env: 'development',
    cache: {},
    ...args,
  }
  const { cwd, config } = context
  return compose(mwsDevServer(cwd, config))(context)
}

export default function (args) {
  return createDevServerContext(args)
    .then(startDevServer)
    .catch(e => {
      //throw e
      console.error(e)
    })
}
