/***************************************************
 * Created by nanyuantingfeng on 2019-06-26 10:47. *
 ***************************************************/
const TerserPlugin = require("terser-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const { isDevelopment, isProduction } = require("./const.env");

module.exports = function(config) {
  config.optimization.merge({
    /* splitChunks: {
      chunks: "all",
      name: false
    },*/

    // Keep the runtime chunk seperated to enable long term caching
    // https://twitter.com/wSokra/status/969679223278505985
    runtimeChunk: false,

    //common
    removeAvailableModules: true,
    removeEmptyChunks: true,
    mergeDuplicateChunks: true,

    // must be false
    sideEffects: false,
    //
    flagIncludedChunks: true,
    occurrenceOrder: true,
    concatenateModules: true,
    //
    usedExports: true,
    providedExports: true,
    noEmitOnErrors: true,
    namedModules: isDevelopment,
    namedChunks: isDevelopment
  });

  if (isProduction) {
    config.optimization.minimizer("ugly").use(TerserPlugin, [
      {
        terserOptions: {
          parse: {
            // we want terser to parse ecma 8 code. However, we don't want it
            // to apply any minfication steps that turns valid ecma 5 code
            // into invalid ecma 5 code. This is why the 'compress' and 'output'
            // sections only apply transformations that are ecma 5 safe
            // https://github.com/facebook/create-react-app/pull/4234
            ecma: 8
          },
          compress: {
            // @ts-ignore
            ecma: 5,
            warnings: false,
            // Disabled because of an issue with Uglify breaking seemingly valid code:
            // https://github.com/facebook/create-react-app/issues/2376
            // Pending further investigation:
            // https://github.com/mishoo/UglifyJS2/issues/2011
            comparisons: false,
            // Disabled because of an issue with Terser breaking valid code:
            // https://github.com/facebook/create-react-app/issues/5250
            // Pending futher investigation:
            // https://github.com/terser-js/terser/issues/120
            inline: 2
          },
          mangle: {
            safari10: true
          },
          output: {
            ecma: 5,
            comments: false,
            // Turned on because emoji and regex is not minified properly using default
            // https://github.com/facebook/create-react-app/issues/2488
            ascii_only: true
          }
        },
        // Use multi-process parallel running to improve the build speed
        // Default number of concurrent runs: os.cpus().length - 1
        parallel: true,
        // Enable file caching
        cache: true,
        sourceMap: false
      }
    ]);

    config.optimization
      .minimizer("css")
      .use(OptimizeCSSAssetsPlugin, [
        { cssProcessorOptions: { safe: true, map: false } }
      ]);
  }
};
