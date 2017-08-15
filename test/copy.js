/**************************************************
 * Created by nanyuantingfeng on 23/06/2017 00:15.
 **************************************************/
let path = require('path')
let fs = require('fs')
let glob = require('glob')
let copyDir = require('copy-dir')

glob('./fixtures/*', function (er, files) {

  files.forEach(file => {

    let isDir = fs.existsSync(path.join(file, 'dist'))

    if (!isDir) {
      return false
    }

    let to = file.replace('./fixtures/', '')

    copyDir(path.join(file, 'dist'), path.join('expect', to), () => true)

  })
})
