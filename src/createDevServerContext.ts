/**************************************************
 * Created by nanyuantingfeng on 2018/6/1 16:58.
 **************************************************/
import compose from 'koa-compose'
import { mwsDevServer } from './mws'
import { Context } from './types'

export default function createDevServerContext(args: any): Promise<Context> {
  const context: Context = {
    cwd: process.cwd(),
    files: {},
    externals: {},
    sdks: {},
    provides: {},
    defines: {},
    outputPath: 'dist',
    default_node_env: 'development',
    cache: {},
    ...args
  }
  const { cwd, config } = context
  // @ts-ignore
  return compose(mwsDevServer(cwd, config))(context)
}
