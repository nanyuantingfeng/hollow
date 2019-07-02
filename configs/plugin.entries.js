/***************************************************
 * Created by nanyuantingfeng on 2019-07-02 18:52. *
 ***************************************************/

module.exports = function(entries) {
  if (typeof entries === 'string') {
    entries = { index: entries }
  }

  return config => {
    const keys = Object.keys(entries)
    keys.forEach(entryName => {
      config.entry(entryName).add(entries[entryName])
    })
  }
}
