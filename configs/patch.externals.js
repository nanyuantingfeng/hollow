/***************************************************
 * Created by nanyuantingfeng on 2019-07-02 19:41. *
 ***************************************************/
function getBuildExternals(files) {
  const ret = {}
  Object.keys(files).forEach(key => {
    const file = files[key]
    if (typeof file === 'string') {
      ret[key] = file
    } else if (file.name) {
      ret[key] = file.name
    }
  })
  return ret
}

module.exports = function(files = {}, externals = {}) {
  return config => {
    const externalsNew = getBuildExternals(Object.assign({}, files, externals))
    const externalsOld = config.get('externals')
    config.externals((externalsOld || []).concat([externalsNew]))
    return externalsNew
  }
}
