/**************************************************
 * Created by nanyuantingfeng on 2018/6/1 16:57.
 **************************************************/
import compose from 'koa-compose';
import { mwsDLL } from './mws';

export default function createBuildDLLContext(args) {
  const context = {
    cwd: process.cwd(),
    files: {},
    externals: {},
    sdks: {},
    provides: {},
    defines: {},
    outputPath: 'dll',
    default_node_env: 'production',
    cache: {},
    ...args,
  };

  const {cwd, config} = context;

  return compose(mwsDLL(cwd, config))(context);
}
