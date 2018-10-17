/**************************************************
 * Created by nanyuantingfeng on 09/11/2017 21:53.
 **************************************************/

export default function(verbose) {
  return {
    all: undefined,

    // 添加资源信息
    assets: true,

    // 对资源按指定的字段进行排序
    assetsSort: 'field',

    // 添加构建时间信息
    builtAt: true,

    // 添加模块被引入的原因
    reasons: false,

    colors: true,

    version: true,

    children: true,

    // 添加 compilation 的哈希值
    hash: verbose,

    // 添加时间信息
    timings: true,

    // 添加警告
    warnings: false,

    // 当文件大小超过 `performance.maxAssetSize` 时显示性能提示
    performance: verbose,

    cached: false,

    cachedAssets: false,

    chunks: verbose,

    // 添加构建模块信息
    modules: verbose,

    // 将构建模块信息添加到 chunk 信息
    chunkModules: verbose,

    // 添加 --env information
    env: true,

    // 显示每个模块到入口起点的距离(distance)
    depth: false,

    exclude: /node_modules/
  }
}
