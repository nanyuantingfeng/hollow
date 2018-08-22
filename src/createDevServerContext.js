/**************************************************
 * Created by nanyuantingfeng on 2018/6/1 16:58.
 **************************************************/
import compose from 'koa-compose'
import { mwsDevServer } from './mws'

export default function createDevServerContext(args) {
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
    ...args
  }
  const { cwd, config } = context
  return compose(mwsDevServer(cwd, config))(context)
}
