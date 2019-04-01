/**************************************************
 * Created by nanyuantingfeng on 2018/6/1 16:57.
 **************************************************/
import compose from 'koa-compose'
import { mwsDLL } from './mws'
import { Context } from './types'

export default function createBuildDLLContext(args: any): Promise<Context> {
  const context: Context = {
    cwd: process.cwd(),
    files: {},
    externals: {},
    sdks: {},
    provides: {},
    defines: {},
    outputPath: 'dll',
    default_node_env: 'production',
    cache: {},
    ...args
  }

  const { cwd, config } = context

  // @ts-ignore
  return compose<Context>(mwsDLL(cwd, config))(context)
}
