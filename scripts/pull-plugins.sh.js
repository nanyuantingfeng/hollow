#!/usr/bin/env node

const path = require('path')
const pullPlugins = require('./pull-plugins')
const concatEntryPlugins = require('./concat-entry-plugins')
const PACKAGE = path.resolve(process.cwd(), 'package.json')
const { name, version, whispered } = require(PACKAGE)
const NAME = name.split('/').pop()

if (!whispered) {
  throw new Error('package.json must have `whispered` node')
}

if (!whispered.remote) {
  throw new Error('package.json `whispered.remote` must be a git repo')
}

if (!name || !NAME.startsWith('entry-')) {
  throw new Error('package.json `name` must be `@xxx/entry-yyy` e.g.  @xxx/entry-web')
}

if (!version) {
  throw new Error('package.json must have `version` node')
}

;(async function() {
  await pullPlugins(whispered)
  await concatEntryPlugins(Object.assign({ name: NAME, version }, whispered))
})()
