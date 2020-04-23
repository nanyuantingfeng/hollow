/***************************************************
 * Created by nanyuantingfeng on 2019/9/17 17:47. *
 ***************************************************/
module.exports = (browserslist, target) => () => {
  require('./const.options.babel').setBrowsers(browserslist)
  require('./const.options.ts').setTarget(target)
}
