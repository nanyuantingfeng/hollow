/***************************************************
 * Created by nanyuantingfeng on 2019-06-25 17:33. *
 ***************************************************/
const babelOptions = require("./const.options.babel");
const tsOptions = require("./const.options.ts.js");
const { WatchIgnorePlugin } = require("webpack");

function useScriptRule(config) {
  return (lang, test) => {
    const baseRule = config.module
      .rule(lang)
      .test(test)
      .exclude.add(/node_modules/)
      .end();

    const workersRule = baseRule.oneOf("workers").resource(/worker/);
    const normalRule = baseRule.oneOf("normal");

    applyRules(workersRule, true);
    applyRules(normalRule, false);

    function applyRules(rule, isWorker) {
      if (isWorker) {
        rule.use("workerize").loader("workerize-loader");
      }

      rule
        .use("babel")
        .loader("babel-loader")
        .options(babelOptions);

      if (lang === "tsx") {
        rule
          .use("ts")
          .loader("ts-loader")
          .options(tsOptions);
      }
    }
  };
}

module.exports = function(config) {
  useScriptRule(config)("jsx", /\.jsx?$/);
  useScriptRule(config)("tsx", /\.tsx?$/);

  config.plugin("WatchIgnorePlugin").use(WatchIgnorePlugin, [[/\.d\.ts$/]]);

  config.module
    .rule("mjsx")
    .test(/\.mjsx?$/)
    .type("javascript/auto")
    .end();
};
