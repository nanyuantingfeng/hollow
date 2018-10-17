/**************************************************
 * Created by nanyuantingfeng on 2018/10/16 17:02.
 **************************************************/
import path from 'path'
import ManifestPlugin from 'webpack-manifest-plugin'
import WorkboxWebpackPlugin from 'workbox-webpack-plugin'
import WebpackPWAManifest from 'webpack-pwa-manifest'

module.exports = async function(context, next) {
  next()

  const { plugins, publicPath = '/', packageMap, pwaManifestOptions } = context

  const publicURL = publicPath.slice(0, -1)

  plugins.push(
    new ManifestPlugin({
      fileName: 'asset-manifest.json',
      publicPath: publicPath
    }),
    new WorkboxWebpackPlugin.GenerateSW({
      clientsClaim: true,
      exclude: [/\.map$/, /asset-manifest\.json$/],
      importWorkboxFrom: 'cdn',
      navigateFallback: publicURL + '/index.html',
      navigateFallbackBlacklist: [
        // Exclude URLs starting with /_, as they're likely an API call
        new RegExp('^/_'),
        // Exclude URLs containing a dot, as they're likely a resource in
        // public/ and not a SPA route
        new RegExp('/[^/]+\\.[^/]+$')
      ]
    }),
    new WebpackPWAManifest({
      name: packageMap.name,
      short_name: packageMap.name,
      description: packageMap.description,
      background_color: '#ffffff',
      //can be null, use-credentials or anonymous
      crossorigin: 'use-credentials',

      icons: [
        {
          src: path.join(__dirname, '../assets/favicon.ico'),
          sizes: [96, 128, 192, 256, 384, 512] // multiple sizes
        }
      ],

      ...pwaManifestOptions
    })
  )
}
