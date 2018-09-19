/**************************************************
 * Created by nanyuantingfeng on 29/10/2017 17:04.
 **************************************************/
import { get } from 'lodash'

get({ a: { b: 5 } }, 'a.b')

require('./demo')

import debounce from 'lodash.debounce'

function YYYY() {
  debounce(8)
}
