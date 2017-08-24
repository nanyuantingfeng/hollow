/**************************************************
 * Created by nanyuantingfeng on 11/06/2017 05:43.
 **************************************************/
import compose from 'koa-compose'

import { mwsBuild } from './mws'
import { startBuild } from './buildCore'

export default function (args) {

  if (!args.cwd) {
    args.cwd = process.cwd()
  }

  if (!args.default_node_env) {
    args.default_node_env = 'production'
  }

  return compose(mwsBuild(args))({args, cache: {}}).then(webpackConfig => {
    return startBuild(webpackConfig, args)
  })

}
