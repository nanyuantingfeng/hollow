/**************************************************
 * Created by nanyuantingfeng on 23/06/2017 00:15.
 **************************************************/
const path = require('path')
const fs = require('fs')
const glob = require('glob')
const copyDir = require('copy-dir')
const shell = require('shelljs')

glob('./cases/*', function (er, files) {

  files.forEach(file => {

    let isDir = fs.existsSync(path.join(file, 'dist'))

    if (!isDir) {
      return false
    }

    const fromPath = path.join(file, 'dist')
    const toPath = path.join('.', 'reference', file.replace('./cases/', ''))
    shell.rm('-rf', toPath)
    copyDir(fromPath, toPath, () => true)
    console.log('success', toPath)
  })
})
