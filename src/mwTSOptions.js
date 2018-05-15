/**************************************************
 * Created by nanyuantingfeng on 16/08/2017 12:59.
 **************************************************/
export default async function (context, next) {

  const options = require('../tsconfig.json')

  context.typescriptOptions =
    context.tsOptions =
      Object.assign({}, { transpileOnly: true, }, options)

  next()
}
