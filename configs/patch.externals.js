/***************************************************
 * Created by nanyuantingfeng on 2019-07-02 19:41. *
 ***************************************************/
module.exports = externals => config => {
  if (externals) {
    const externalsOld = config.get('externals')
    config.externals(Object.assign({}, externalsOld || {}, externals))
  }
}
