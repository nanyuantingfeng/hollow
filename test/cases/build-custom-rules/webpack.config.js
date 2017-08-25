/**************************************************
 * Created by nanyuantingfeng on 25/08/2017 14:42.
 **************************************************/

module.exports = async function (context, next) {
  context.rules.push({
    test: /\.svgx$/,
    use: [
      {loader: 'babel-loader'},
      {
        loader: 'react-svg-loader',
        options: {
          svgo: {
            plugins: [{removeTitle: false}],
            floatPrecision: 2
          }
        }
      }
    ],
  })
}
