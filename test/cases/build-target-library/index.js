import { foo, something } from './dep_one.js'

export function ss() {
  return something()
}

export default function() {
  console.log('----=-=-==---=-')
  return foo()
}

something()
foo()

async function demo0() {
  const x = await import('./dep_two.js')
  x.default()
  console.log(x.hello())
}

demo0().then(() => {
  console.log('done')
})
