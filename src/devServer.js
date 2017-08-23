/**************************************************
 * Created by nanyuantingfeng on 12/06/2017 00:08.
 **************************************************/
import compose from 'koa-compose'

import { mwsDevServer } from './mws'
import { processOptions } from './devServerCore'

export default function (args) {

  if (!args.cwd) {
    args.cwd = process.cwd()
  }

  return compose(mwsDevServer(args))({args, cache: {}}).then(webpackConfig => {
    return processOptions(webpackConfig, args)
  })
}
