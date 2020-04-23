/***************************************************
 * Created by nanyuantingfeng on 2019-07-02 19:30. *
 ***************************************************/
const CopyWebpackPlugin = require('copy-webpack-plugin')

function getBuildCopyFiles(files) {
  if (Array.isArray(files)) {
    return files.map(from => ({ from }))
  }
  return Object.keys(files)
    .filter(key => {
      const file = files[key]
      return typeof file === 'string' || !!file.path
    })
    .map(key => {
      const file = files[key]
      if (typeof file === 'string') {
        return { from: file, to: key }
      }
      return { from: file.path, to: file.to || key }
    })
}

module.exports = function(files) {
  return config => {
    // 至少保证有一个条目
    if (files && Object.keys(files).length >= 1) {
      const nn = getBuildCopyFiles(files || [])
      config.plugin('CopyWebpackPlugin').use(CopyWebpackPlugin, [nn])
      return nn
    }
    return undefined
  }
}
