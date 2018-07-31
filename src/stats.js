/**************************************************
 * Created by nanyuantingfeng on 09/11/2017 21:53.
 **************************************************/

const stats = {
  assets: true,
  colors: true,
  version: true,
  children: true,
  hash: true,
  timings: true,
  warnings: true,
  performance: true,
  modulesSort: 'field',

  cached: false,
  cachedAssets: false,
  chunks: false,
  chunkModules: false,
  modules: false,

  exclude: /node_modules|typings/,
};

export default stats;
