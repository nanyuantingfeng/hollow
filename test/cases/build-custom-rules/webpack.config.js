/**************************************************
 * Created by nanyuantingfeng on 25/08/2017 14:42.
 **************************************************/

module.exports = async function(context, next) {
  context.rules.push({
    test: /\.svgx$/,
    use: [{ loader: '@svgr/webpack' }]
  })
}
