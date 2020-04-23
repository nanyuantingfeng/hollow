#!/usr/bin/env node

const path = require('path')
const pushPlugin = require('./push-plugin')
const PACKAGE = path.resolve(process.cwd(), 'package.json')
const { name, version, whispered } = require(PACKAGE)
const NAME = name.split('/').pop()
const source = process.argv[2]

if (!source) {
  throw new Error('`push-plugin` need a parameter at <path>')
}

if (!whispered) {
  throw new Error('package.json must have `whispered` node')
}

if (!whispered.remote) {
  throw new Error('package.json `whispered.remote` must be a git repo')
}

if (!name || !NAME.startsWith('plugin-')) {
  throw new Error('package.json `name` must be `@xxx/plugin-xxx-xxx` e.g.  @xxx/plugin-web-demo')
}

if (!version) {
  throw new Error('package.json must have `version` node')
}

;(async function() {
  await pushPlugin(Object.assign({ name: NAME, version, source }, whispered))
})()
