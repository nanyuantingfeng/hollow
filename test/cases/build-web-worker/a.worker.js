/**************************************************
 * Created by nanyuantingfeng on 28/11/2017 10:57.
 **************************************************/
importScripts('./b')

const demo = { a: false }

self.addEventListener('message', function (e) {
  self.postMessage('You said: ' + e.data)
}, false)

self.onmessage = function (event) {
  const { a } = demo

  const method = event.data.method
  const args = event.data.args
  const reply = doSomething(args)
  self.postMessage({ method: method, reply: reply })
}

