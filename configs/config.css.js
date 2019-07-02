/***************************************************
 * Created by nanyuantingfeng on 2019-06-25 17:27. *
 ***************************************************/
const path = require("path");
const autoprefixer = require("autoprefixer");
const flexbugsfixes = require("postcss-flexbugs-fixes");
const MiniCSSExtractPlugin = require("mini-css-extract-plugin");
const { isDevelopment, cwd, packageMap } = require("./const.env");

const theme = getThemeMap(packageMap, cwd);

function getThemeMap(packageMap, cwd) {
  let theme = {};

  const packageMapTheme = packageMap.theme;

  if (packageMapTheme && typeof packageMapTheme === "string") {
    let pp = packageMapTheme;

    if (pp.charAt(0) === ".") {
      pp = path.resolve(cwd, pp);
    }

    const fn = require(pp);
    theme = fn();
  } else if (packageMapTheme && typeof packageMapTheme === "object") {
    theme = packageMapTheme;
  }

  return theme;
}

function useStyleRule(config) {
  return (lang, test, loader, options) => {
    const baseRule = config.module.rule(lang).test(test);
    const modulesRule = baseRule.oneOf("modules").resource(/module/);
    const normalRule = baseRule.oneOf("normal");

    applyRules(modulesRule, true);
    applyRules(normalRule, false);

    function applyRules(rule, modules) {
      if (!isDevelopment) {
        rule.use("mini-css-extract").loader(MiniCSSExtractPlugin.loader);
      } else {
        rule.use("style-loader").loader("style-loader");
      }

      rule
        .use("css-loader")
        .loader("css-loader")
        .options({
          sourceMap: isDevelopment,
          modules: modules && {
            localIdentName: "[local]--[hash:base64:8]"
          }
        });

      rule
        .use("postcss-loader")
        .loader("postcss-loader")
        .options({
          plugins: [flexbugsfixes, autoprefixer({ flexbox: "no-2009" })],
          sourceMap: isDevelopment
        });

      if (loader) {
        rule
          .use(loader)
          .loader(loader)
          .options(options);
      }
    }
  };
}

module.exports = function(config) {
  useStyleRule(config)("css", /\.css$/);
  useStyleRule(config)("less", /\.less$/, "less-loader", {
    javascriptEnabled: true,
    sourceMap: true,
    modifyVars: theme
  });

  if (!isDevelopment) {
    config.plugin("MiniCSSExtractPlugin").use(MiniCSSExtractPlugin, [
      {
        filename: "[name]-[contenthash:8].css",
        chunkFilename: "[name]-[contenthash:8].chunk.css"
      }
    ]);
  }
};
