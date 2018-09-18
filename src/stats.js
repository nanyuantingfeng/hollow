/**************************************************
 * Created by nanyuantingfeng on 09/11/2017 21:53.
 **************************************************/
const stats = {
  all: undefined,

  // 添加资源信息
  assets: true,

  // 对资源按指定的字段进行排序
  assetsSort: 'field',

  // 添加构建日期和构建时间信息
  builtAt: true,

  // 添加模块被引入的原因
  reasons: true,

  colors: true,

  version: true,

  children: true,

  // 添加 compilation 的哈希值
  hash: true,
  // 添加时间信息
  timings: true,

  // 添加警告
  warnings: true,

  // 当文件大小超过 `performance.maxAssetSize` 时显示性能提示
  performance: true,

  cached: false,

  cachedAssets: false,

  chunks: false,

  // 将构建模块信息添加到 chunk 信息
  chunkModules: false,

  // 添加 --env information
  env: true,

  // 添加构建模块信息
  modules: false,

  // 显示每个模块到入口起点的距离(distance)
  depth: false,

  exclude: /node_modules/
}

export default stats
