import Worker from './a.worker'

const worker = new Worker()

worker.postMessage({ a: 1 })
worker.onmessage = function (event) {}

worker.addEventListener('message', function (e) {
  console.log(e.data)
}, false)

console.log(1)
