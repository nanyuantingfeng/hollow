/**************************************************
 * Created by nanyuantingfeng on 25/08/2017 14:42.
 **************************************************/

module.exports = function(config) {
  const files = {
    mime: { name: 'mime', path: '../../../node_modules/mime/mime.js' }
  }

  const sdks = {
    index0: ['es6-promise.auto.min.js', 'fetch.js'],

    index1: ['es6-promise.auto.min.js', 'https://g.alicdn.com/xxxxxx/open/1.0.0/dingtalk.js'],

    index2: ['es6-promise.auto.min.js', 'mime.js', 'https://g.alicdn.com/xxxxxx/open/1.0.0/dingtalk.js']
  }

  const defines = { UPLOAD_INVOICE_FILE_URL: '"http://127.0.0.1:7367364"' }

  config.patch({ files, sdks, defines })
}
