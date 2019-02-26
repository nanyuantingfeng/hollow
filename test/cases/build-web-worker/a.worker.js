/**************************************************
 * Created by nanyuantingfeng on 28/11/2017 10:57.
 **************************************************/
importScripts('./b')

import { fa, fb } from './b'

const demo = { a: false }

self.addEventListener(
  'message',
  function(e) {
    self.postMessage('You said: ' + e.data)
  },
  false
)

self.onmessage = function(event) {
  const { a } = demo

  fa(a)

  fb().then(x => {
    console.log('===========xxx')
  })

  const method = event.data.method
  const args = event.data.args
  const reply = doSomething(args)
  self.postMessage({ method: method, reply: reply })
}
