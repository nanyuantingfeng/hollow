/**************************************************
 * Created by nanyuantingfeng on 11/06/2017 05:43.
 **************************************************/
import compose from 'koa-compose'

import { mwsBuild } from './mws'
import startBuild from './buildCore'

export default function (args) {
  const context = {
    cwd: process.cwd(),
    files: {},
    externals: {},
    sdks: {},
    provides: {},
    defines: {},
    outputPath: 'dist',
    cache: {},
    ...args,
  }

  const { cwd, config } = context

  return compose(mwsBuild(cwd, config))(context)
    .then(startBuild)
    .catch(e => {
      console.error(e)
    })
}
