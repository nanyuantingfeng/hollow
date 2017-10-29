/**************************************************
 * Created by nanyuantingfeng on 16/08/2017 12:55.
 **************************************************/
import rucksack from 'rucksack-css'
import autoprefixer from 'autoprefixer'

export default async function (context, next) {

  context.postcssOptions = {
    sourceMap: true,
    plugins: [
      rucksack(),
      autoprefixer({
        remove: false,
        browsers: [
          'last 2 versions',
          'Firefox ESR',
          '> 1%',
          'ie >= 8',
          'iOS >= 8',
          'Android >= 4'],
      }),
    ]
  }

  next()
}
