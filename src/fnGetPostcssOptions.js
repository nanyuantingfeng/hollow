/**************************************************
 * Created by nanyuantingfeng on 11/06/2017 08:49.
 **************************************************/
import rucksack from 'rucksack-css'
import autoprefixer from 'autoprefixer'

export default function () {
  return {
    plugins: [
      rucksack(),
      autoprefixer({
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
}
