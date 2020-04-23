/***************************************************
 * Created by nanyuantingfeng on 2019-07-02 18:42. *
 ***************************************************/
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlWebpackTagsPlugin = require('html-webpack-tags-plugin')

const path = require('path')
const fs = require('fs')

function isRemoteURL(url) {
  return ['http://', 'file://', 'https://', 'ftp://', '//'].some(k => url.startsWith(k))
}

function isLocalURL(url) {
  return ['||', '!!'].some(k => url.startsWith(k))
}

function getTemplatePath(templatePath) {
  if (templatePath) {
    const p = path.join(process.cwd(), templatePath)
    if (fs.existsSync(p)) {
      return p
    }
    console.log(`html::template => ${templatePath} 没有找到`)
  }

  const p = ext => path.join(process.cwd(), 'html-template' + ext)
  const ii = ['.ejs', '.hbs', '.html']

  let oo = path.join(__dirname, '../html-template.ejs')

  let i = -1
  while (++i < ii.length) {
    const pp = p(ii[i])
    if (fs.existsSync(pp)) {
      oo = pp
      break
    }
  }

  return oo
}

function buildOneTag(options) {
  if (typeof options === 'string') {
    options = { path: options }
  }

  if (typeof options !== 'object' || Array.isArray(options) || !options.path) {
    throw new Error('sdks must be String or { path:string, ...}')
  }

  const { path, ...others } = options
  const trimPath = path.trim()

  if (isRemoteURL(trimPath)) {
    return { ...others, path: trimPath, publicPath: false }
  }

  if (isLocalURL(trimPath)) {
    return { ...others, path: trimPath.slice(2), publicPath: false }
  }

  return { ...others, path: trimPath, publicPath: true }
}

module.exports = function(entries, sdks, htmls) {
  sdks = sdks || {}
  htmls = htmls || {}

  return config => {
    const keys = Object.keys(entries)

    keys.forEach(entryName => {
      let sdk = sdks[entryName] || []

      if (typeof sdk === 'string') {
        sdk = [sdk]
      }

      if (sdks['*']) {
        sdk = sdk.concat(sdks['*'])
      }

      const scripts = sdk.slice(0)

      const _htmlOption = { ...htmls['*'], ...htmls[entryName] }

      const htmlOptions = {
        inject: true,

        entryName: entryName,
        filename: `${entryName}.html`,
        chunks: [entryName],

        chunksSortMode: 'auto',

        ..._htmlOption,

        template: getTemplatePath(_htmlOption.template)
      }

      config.plugin(`HtmlWebpackPlugin::${entryName}`).use(HtmlWebpackPlugin, [htmlOptions])
      config.plugin(`HtmlWebpackTagsPlugin::${entryName}`).use(HtmlWebpackTagsPlugin, [
        {
          files: [`${entryName}.html`],
          tags: scripts.map(buildOneTag),
          append: false
        }
      ])
    })
  }
}
