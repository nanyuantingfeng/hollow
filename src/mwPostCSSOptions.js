/**************************************************
 * Created by nanyuantingfeng on 16/08/2017 12:55.
 **************************************************/
import autoprefixer from 'autoprefixer'
import cssnano from 'cssnano'

export default async function (context, next) {

  context.postcssOptions = {
    sourceMap: true,
    plugins: [
      autoprefixer({
        browsers: [
          'last 2 versions',
          'Firefox ESR',
          '> 1%',
          'ie >= 9',
          'iOS >= 8',
          'Android >= 4'],
      }),
      cssnano(),
    ]
  }

  next()
}
