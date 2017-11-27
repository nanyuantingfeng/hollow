import React from 'react'

console.log(process.env.NODE_ENV)
console.log(APPLICATION_VERSION)
console.log(VERSION)


if (process.env.NODE_ENV !== 'production') {
  console.log('---------------------------<>')
}
