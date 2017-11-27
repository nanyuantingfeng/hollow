/**************************************************
 * Created by nanyuantingfeng on 11/06/2017 05:43.
 **************************************************/
import compose from 'koa-compose'

import { mwsDLL } from './mws'
import startBuild from './buildCore'

export default function (args) {
  const context = {
    cwd: process.cwd(),
    files: {},
    externals: {},
    sdks: {},
    provides: {},
    defines: {},
    outputPath: 'dll',
    cache: {},
    ...args,
  }

  const { cwd, config } = context

  return compose(mwsDLL(cwd, config))(context)
    .then(startBuild)
    .catch(e => {
      console.error(e)
    })
}
