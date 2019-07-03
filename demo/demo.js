/***************************************************
 * Created by nanyuantingfeng on 2019-06-25 17:22. *
 ***************************************************/
process.env.ASSET_PATH = 'http://xxxxxa/da/dd'

const config = require('../webpack.entry.config')
const { env } = require('../configs/const.env')

const entry = {
  index0: './1.js',
  index1: './2.js',
  index2: './3.js',
  index3: './4.js'
}

const sdks = {
  index1: ['promise.js']
}

const files = {
  'default.theme.css': { path: 'src/themes/default.theme.css' },
  '导入档案模板.xlsx': { path: 'src/file/导入档案模板.xlsx' },
  '导入收款信息模板.xlsx': { path: 'src/file/导入收款信息模板.xlsx' },
  '合作企业开户授权委托书.docx': { path: 'src/file/合作企业开户授权委托书.docx' },
  '导入员工模板.xlsx': { path: 'src/file/导入员工模板.xlsx' },

  'toIE.html': { path: 'src/file/toIE.html' },
  'main.png': { path: 'src/file/images/main.png' },
  'button.png': { path: 'src/file/images/button.png' },
  'favicon.ico': { path: 'src/file/favicon.ico' },
  'more-DT.html': { path: 'src/file/more-DT.html' },
  'learn-more-DT.png': { path: 'src/file/learn-more-DT.png' },
  'more-KdCloud.html': { path: 'src/file/more-KdCloud.html' },
  'learn-more-KdCloud.jpeg': { path: 'src/file/learn-more-KdCloud.jpeg' },

  i18n: { path: 'src/i18n/locales', to: 'locales/' },
  'logo.png': { path: 'src/images/standalone/logo.png' },
  'dingdingProbe.js': { path: 'src/hosting/dingtalk/dingdingProbe.js' }
}

const externals = {
  jquery: 'jQuery'
}

function prefixReactURL(name) {
  const envU = env === 'beta' ? 'production' : env
  const useMin = envU === 'production'
  return `${name}.${envU}${useMin ? '.min' : ''}.js`
}

const cdn = [
  {
    name: 'react',
    var: 'React',
    path: prefixReactURL('umd/react')
  },
  {
    name: 'react-dom',
    var: 'ReactDOM',
    path: prefixReactURL('umd/react-dom')
  }
]

config.patch({ entry,/* sdks, files, externals, cdn*/ })

module.exports = config.toString()
;(function() {
  const fs = require('fs')
  const path = require('path')
  fs.writeFileSync(
    path.join(__dirname, 'output.config.js'),
    `
module.export = ${module.exports}
`
  )
})()
