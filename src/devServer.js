/**************************************************
 * Created by nanyuantingfeng on 12/06/2017 00:08.
 **************************************************/
import compose from 'koa-compose'

import { mwsDevServer } from './mws'
import { startDevServer } from './devServerCore'

export default function (args) {
  let context = {
    cwd: process.cwd(),
    files: {},
    externals: {},
    sdks: {},
    provides: {},
    defines: {},
    default_node_env: 'development',
    cache: {},
    ...args,
  }

  let {cwd, config} = context

  return compose(mwsDevServer(cwd, config))(context)
    .then(startDevServer)
    .catch(e => {
      console.error(e)
    })
}
