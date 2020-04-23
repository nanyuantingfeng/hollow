/***************************************************
 * Created by nanyuantingfeng on 2019-06-25 17:27. *
 ***************************************************/
const path = require('path')
const pxtorem = require('postcss-pxtorem')
const autoprefixer = require('autoprefixer')
const flexbugsfixes = require('postcss-flexbugs-fixes')
const MiniCSSExtractPlugin = require('mini-css-extract-plugin')
const { isDevelopment, cwd, packageMap } = require('./const.env')

const theme = getThemeMap(packageMap, cwd)

function getThemeMap(packageMap, cwd) {
  let theme = {}

  const packageMapTheme = packageMap.theme

  if (packageMapTheme && typeof packageMapTheme === 'string') {
    let pp = packageMapTheme

    if (pp.charAt(0) === '.') {
      pp = path.resolve(cwd, pp)
    }

    const fn = require(pp)
    theme = fn()
  } else if (packageMapTheme && typeof packageMapTheme === 'object') {
    theme = packageMapTheme
  }

  return theme
}

module.exports = function(config) {
  const useStyleRule = config => (lang, test, loader, options) => {
    const baseRule = config.module.rule(lang).test(test)
    const modulesRule = baseRule.oneOf('modules').resource(/module\.\w+ss$/)
    const normalRule = baseRule.oneOf('normal')

    applyRules(modulesRule, true)
    applyRules(normalRule, false)

    function applyRules(rule, isModules) {
      if (!isDevelopment) {
        rule.use('mini-css-extract').loader(MiniCSSExtractPlugin.loader)
      } else {
        rule.use('style-loader').loader('style-loader')
      }

      rule
        .use('css-loader')
        .loader('css-loader')
        .options({
          sourceMap: isDevelopment,
          modules: isModules && {
            localIdentName: '[local]--[hash:base64:8]'
          }
        })

      rule
        .use('postcss-loader')
        .loader('postcss-loader')
        .options({
          plugins: [
            flexbugsfixes,

            autoprefixer({
              overrideBrowserslist: config.$$cache.browserslist,
              flexbox: 'no-2009'
            }),

            config.$$cache.pxtorem ? pxtorem(config.$$cache.pxtorem) : undefined
          ].filter(Boolean),

          sourceMap: isDevelopment
        })

      if (loader) {
        rule
          .use(loader)
          .loader(loader)
          .options(options)
      }
    }
  }

  useStyleRule(config)('css', /\.css$/)
  useStyleRule(config)('less', /\.less$/, 'less-loader', {
    javascriptEnabled: true,
    sourceMap: true,
    modifyVars: theme
  })

  if (!isDevelopment) {
    config.plugin('MiniCSSExtractPlugin').use(MiniCSSExtractPlugin, [
      {
        filename: '[name]-[contenthash:8].css',
        chunkFilename: '[name]-[contenthash:8].chunk.css'
      }
    ])
  }
}
