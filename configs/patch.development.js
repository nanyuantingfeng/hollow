/***************************************************
 * Created by nanyuantingfeng on 2019-07-18 19:38. *
 ***************************************************/
const cluster = require('webpack-micro-cluster')

module.exports.forPlugin = options => config => {
  config.plugin('PluginInjectPatchPlugin').use(cluster.Worker, [options])
}

module.exports.forEntry = options => config => {
  config.plugin('EntryInjectPatchPlugin').use(cluster.Master, [options])
}
