/**************************************************
 * Created by nanyuantingfeng on 28/11/2017 10:57.
 **************************************************/
import { fa, fb } from './b'

const demo = { a: false }

export function aaaa() {
  fa()
}

export function bbbb() {
  fb().then(x => {
    console.log('===========xxx')
  })
}

export function cccc() {
  return demo
}
