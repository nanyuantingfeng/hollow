/***************************************************
 * Created by nanyuantingfeng on 2019/9/17 17:47. *
 ***************************************************/
module.exports = function(options) {
  return () => {
    if (options && options.length) {
      require('./const.options.babel').setImports(options)
      require('./const.options.ts').setImports(options)
    }
  }
}
