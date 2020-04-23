/***************************************************
 * Created by nanyuantingfeng on 2019/12/26 17:07. *
 ***************************************************/
const Git = require('simple-git/promise')
const path = require('path')
const fs = require('fs-extra')
const rimraf = require('rimraf')

async function initRepo(git, remote) {
  await git.init()
  await git.addRemote('origin', remote)
  await git.addConfig('core.sparsecheckout', 'false')
}

function copySource(P, version, source) {
  const DIST = path.join(P, version)
  fs.mkdirSync(P, { recursive: true })
  fs.copySync(path.join(process.cwd(), source), DIST)
}

async function hasBranch(git, branchName) {
  const refs = await git.listRemote(['--refs'])
  return new RegExp(branchName + '$', 'm').test(refs)
}

module.exports = async function pushOne(options) {
  const { remote, name, version, branch_prefix = '', source } = options
  const __TEMP__ = path.join(process.cwd(), '.temp')
  rimraf.sync(__TEMP__)
  const P = path.join(__TEMP__, name)
  fs.mkdirSync(P, { recursive: true })

  const git = Git(P)
  await initRepo(git, remote)

  const branchName = branch_prefix + name
  const __has = await hasBranch(git, branchName)

  if (__has) {
    await git.checkout(['-b', branchName])
    await git.pull('origin', branchName)
  } else {
    await git.checkoutLocalBranch(branchName)
  }

  copySource(P, version, source)
  await git.add('.')
  await git.commit(version)
  await git.push('origin', branchName)
  rimraf.sync(__TEMP__)
  console.log(`${branchName}@${version}  push success... `)
}
