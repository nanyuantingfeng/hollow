/**************************************************
 * Created by nanyuantingfeng on 25/08/2017 14:42.
 **************************************************/

module.exports = async function (context, next) {

  let externals = {
    'mime': {name: 'mime', path: '../../../node_modules/mime/mime.js'},
  }

  let files = Object.assign({
    'whatwg-fetch': {path: '../../../node_modules/whatwg-url/lib/URL.js'},
  }, externals)

  let sdks = {

    'index0': [
      'es6-promise.auto.min.js',
      'fetch.js',
    ],

    'index1': [
      'es6-promise.auto.min.js',
      'fetch.js',
      'https://g.alicdn.com/xxxxxx/open/1.0.0/dingtalk.js',
    ],

    'index2': [
      'es6-promise.auto.min.js',
      'fetch.js',
      'https://g.alicdn.com/xxxxxx/open/1.0.0/dingtalk.js',
    ],

  }

  let defines = {UPLOAD_INVOICE_FILE_URL: '"http://127.0.0.1:9999"'}

  context.externals = externals
  context.files = files
  context.sdks = sdks
  context.defines = defines
}
