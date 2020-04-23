#!/usr/bin/env node

const portFinder = require('portfinder')
;(async () => {
  const A2 = Number(process.argv[2])
  const portL = isNaN(A2) ? 8000 : A2
  const port = await portFinder.getPortPromise({ port: portL + 1 })
  console.log(port)
})()
