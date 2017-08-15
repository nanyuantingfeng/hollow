/**************************************************
 * Created by nanyuantingfeng on 09/08/2017 16:59.
 **************************************************/
export default function (webpackConfig) {
  const configs = Array.isArray(webpackConfig) ? webpackConfig : [webpackConfig]
  const hasEmptyEntry = configs.some(c => Object.keys(c.entry || {}).length === 0)
  if (hasEmptyEntry) {
    const err = new Error('no webpack entry found')
    err.name = 'NoEntry'
    throw err
  }
}
