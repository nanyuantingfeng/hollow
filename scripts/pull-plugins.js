/***************************************************
 * Created by nanyuantingfeng on 2019/12/26 11:51. *
 ***************************************************/
const Git = require('simple-git/promise')
const path = require('path')
const fs = require('fs-extra')
const rimraf = require('rimraf')

async function initRepo(git, remote) {
  await git.init()
  await git.addRemote('origin', remote)
  await git.addConfig('core.sparsecheckout', 'true')
}

function writeSparseInfo(P, V) {
  fs.writeFileSync(path.join(P, '.git/info/sparse-checkout'), V, { flag: 'w' })
}

async function pullOne(git, P, N, V, remote) {
  await initRepo(git, remote)
  writeSparseInfo(P, V)
  await git.pull('origin', N)
  await removeVersionDir(P, V)
  console.log(`${N}@${V}`)
}

async function removeVersionDir(P, V) {
  // move xxx/version/** -> xxx/
  const OLD_DIR = path.join(P, V)
  await fs.copy(OLD_DIR, P)
  rimraf.sync(OLD_DIR)
  rimraf.sync(path.join(P, '.git'))
}

module.exports = async function pullPlugins(options) {
  const { assets_dist = '.dist/assets', plugins = {}, branch_prefix = '', remote } = options

  const promises = Object.keys(plugins)
    .filter(name => !!plugins[name])
    .map(name => {
      const V = plugins[name]
      const P = path.join(process.cwd(), assets_dist, name)
      if (!fs.existsSync(P)) {
        fs.mkdirSync(P, { recursive: true })
      }
      const git = Git(P)
      const N = branch_prefix + name
      return pullOne(git, P, N, V, remote)
    })

  return Promise.all(promises)
}
