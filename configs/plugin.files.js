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
        return { from: file }
      }
      return { from: file.path, to: file.to }
    })
}

module.exports = function(files) {
  const nn = getBuildCopyFiles(files)
  return config => {
    config.plugin('CopyWebpackPlugin').use(CopyWebpackPlugin, [nn])
    return nn
  }
}
