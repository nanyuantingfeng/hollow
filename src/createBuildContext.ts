/**************************************************
 * Created by nanyuantingfeng on 2018/6/1 16:56.
 **************************************************/
import compose from 'koa-compose'
import { mwsBuild } from './mws'
import { Context } from './types'

export default function createBuildContext(args: any): Promise<Context> {
  const context: Context = {
    cwd: process.cwd(),
    files: {},
    externals: {},
    sdks: {},
    provides: {},
    defines: {},
    outputPath: 'dist',
    default_node_env: 'production',
    cache: {},
    ...args
  }

  const { cwd, config } = context

  // @ts-ignore
  return compose<Context>(mwsBuild(cwd, config))(context)
}
