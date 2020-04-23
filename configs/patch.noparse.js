/***************************************************
 * Created by nanyuantingfeng on 2019-07-02 19:41. *
 ***************************************************/
module.exports = noParse => config => {
  if (noParse) {
    let noParseOld = config.module.get('noParse')

    if (!Array.isArray(noParseOld)) {
      noParseOld = [noParseOld]
    }

    config.module.noParse(noParseOld.concat(noParse))
  }
}
