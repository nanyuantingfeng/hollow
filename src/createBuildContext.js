/**************************************************
 * Created by nanyuantingfeng on 2018/6/1 16:56.
 **************************************************/
import compose from 'koa-compose';
import { mwsBuild } from './mws';

export default function createBuildContext(args) {

  const context = {
    cwd: process.cwd(),
    files: {},
    externals: {},
    sdks: {},
    provides: {},
    defines: {},
    outputPath: 'dist',
    default_node_env: 'production',
    cache: {},
    ...args,
  };

  const {cwd, config} = context;
  return compose(mwsBuild(cwd, config))(context);
}
