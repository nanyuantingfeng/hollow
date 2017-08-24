/**************************************************
 * Created by nanyuantingfeng on 12/06/2017 00:08.
 **************************************************/
import compose from 'koa-compose'

import { mwsDevServer } from './mws'
import { startDevServer } from './devServerCore'

export default function (args) {

  if (!args.cwd) {
    args.cwd = process.cwd()
  }

  if (!args.default_node_env) {
    args.default_node_env = 'development'
  }

  return compose(mwsDevServer(args))({args, cache: {}}).then(webpackConfig => {
    return startDevServer(webpackConfig, args)
  })
}
