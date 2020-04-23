/***************************************************
 * Created by nanyuantingfeng on 2019-06-25 17:29. *
 ***************************************************/
module.exports = function(config) {
  const limit = 1024 * 10 // 30KB

  config.module
    .rule('svgx')
    .test(/\.svgx$/)
    .use('svgx')
    .loader('@svgr/webpack')
    .end()
    .end()

  config.module
    .rule('json5')
    .test(/\.json5$/)
    .use('json5')
    .loader('json5-loader')
    .end()
    .end()

  config.module
    .rule('woff')
    .test(/\.(woff|woff2)?(\?v=\d+\.\d+\.\d+)?$/)
    .use('font')
    .loader('file-loader')
    .options({ limit, esModule: false, mimetype: 'application/font-woff' })
    .end()
    .end()

  config.module
    .rule('ttf')
    .test(/\.ttf(\?v=\d+\.\d+\.\d+)?$/)
    .use('font')
    .loader('file-loader')
    .options({ limit, esModule: false, mimetype: 'application/octet-stream' })
    .end()
    .end()

  config.module
    .rule('eot')
    .test(/\.eot(\?v=\d+\.\d+\.\d+)?$/)
    .use('font')
    .loader('file-loader')
    .options({ limit, esModule: false, mimetype: 'application/vnd.ms-fontobject' })
    .end()
    .end()

  config.module
    .rule('svg')
    .test(/\.svg(\?v=\d+\.\d+\.\d+)?$/)
    .use('svg')
    .loader('url-loader')
    .options({ limit, esModule: false, name: 'static/media/[name].[hash:8].[ext]', mimetype: 'image/svg+xml' })
    .end()
    .end()

  config.module
    .rule('img')
    .test(/\.(bmp|png|jpe?g|gif)(\?v=\d+\.\d+\.\d+)?$/i)
    .use('img')
    .loader('url-loader')
    .options({
      limit,
      esModule: false,
      name: 'static/media/[name].[hash:8].[ext]'
    })
    .end()
    .end()

  config.module
    .rule('html')
    .test(/\.html?$/)
    .use('html')
    .loader('file-loader')
    .options({
      esModule: false,
      name: 'static/html/[name].[hash:8].[ext]'
    })
    .end()
    .end()

  config.module
    .rule('hbs')
    .test(/\.hbs?$/)
    .use('hbs')
    .loader('mustache-loader')
    .end()
    .end()

  // 修改 css 中图片到相对路径
  config.plugin('ReplacerWebpackPlugin').use(require('replacer-webpack-plugin'), [
    {
      includes: /.+\.css$/i,
      search: /url\(.+?(static\/media\/.+?)\)/g,
      replace: 'url(./$1)'
    }
  ])
}
