const something = function() {
  console.log('SOMETHING IS dep_one.js')
}

const foo = function() {
  console.log('FOO IS HAPPENING HERE', 'FOO', 'FOO')
}

export { something, foo }
