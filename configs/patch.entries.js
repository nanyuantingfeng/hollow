/***************************************************
 * Created by nanyuantingfeng on 2019-07-02 18:52. *
 ***************************************************/
const { packageMap } = require('./const.env')

module.exports = function(entries) {
  if (!entries) {
    entries = packageMap.entry
  }

  if (typeof entries === 'string') {
    entries = { index: entries }
  }

  if (!entries) {
    return () => false
  }

  return config => {
    const keys = Object.keys(entries)
    keys.forEach(entryName => config.entry(entryName).add(entries[entryName]))
    return entries
  }
}
