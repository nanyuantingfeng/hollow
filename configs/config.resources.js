/***************************************************
 * Created by nanyuantingfeng on 2019-06-25 17:29. *
 ***************************************************/
module.exports = function(config) {
  const limit = 10240;

  config.module
    .rule("svgx")
    .test(/\.svgx$/)
    .use("svgx")
    .loader("@svgr/webpack")
    .end()
    .end();

  config.module
    .rule("json5")
    .test(/\.json5$/)
    .use("json5")
    .loader("json5-loader")
    .end()
    .end();

  config.module
    .rule("font")
    .test(/\.(woff|woff2)?(\?v=\d+\.\d+\.\d+)?$/)
    .use("font")
    .loader("file-loader")
    .options({ limit, mimetype: "application/font-woff" })
    .end()
    .end();

  config.module
    .rule("font")
    .test(/\.ttf(\?v=\d+\.\d+\.\d+)?$/)
    .use("font")
    .loader("file-loader")
    .options({ limit, mimetype: "application/octet-stream" })
    .end()
    .end();

  config.module
    .rule("font")
    .test(/\.eot(\?v=\d+\.\d+\.\d+)?$/)
    .use("font")
    .loader("file-loader")
    .options({ limit, mimetype: "application/vnd.ms-fontobject" })
    .end()
    .end();

  config.module
    .rule("svg")
    .test(/\.svg(\?v=\d+\.\d+\.\d+)?$/)
    .use("svg")
    .loader("file-loader")
    .options({ limit, mimetype: "image/svg+xml" })
    .end()
    .end();

  config.module
    .rule("img")
    .test(/\.(bmp|png|jpe?g|gif)(\?v=\d+\.\d+\.\d+)?$/i)
    .use("img")
    .loader("url-loader")
    .options({
      limit,
      name: "static/media/[name].[hash:8].[ext]"
    })
    .end()
    .end();

  config.module
    .rule("html")
    .test(/\.html?$/)
    .use("html")
    .loader("file-loader")
    .options({
      name: "[path]-[name].[ext]"
    })
    .end()
    .end();

  config.module
    .rule("hbs")
    .test(/\.hbs?$/)
    .use("hbs")
    .loader("mustache-loader")
    .end()
    .end();
};
