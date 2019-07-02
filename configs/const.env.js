/***************************************************
 * Created by nanyuantingfeng on 2019-06-25 17:12. *
 ***************************************************/
const path = require("path");
const fs = require("fs");
const chalk = require("chalk");

const env = process.env.NODE_ENV || "development";
const isProduction = env === "production";
const isDevelopment = env === "development";
const isBeta = env === "beta";

const cwd = process.cwd();
const root = cwd;
const src = path.resolve(root, "src");
const build = path.resolve(root, "dist");

console.log(chalk.green(`> current env : ${env}\n\n`));

function getValueByPath(path) {
  return !fs.existsSync(path) ? {} : require(path);
}

const packageMap = getValueByPath(path.join(cwd, "package.json"));

module.exports = {
  isProduction,
  isDevelopment,
  isBeta,
  env,

  root, // 项目根目录
  cwd: root,
  src, // 项目业务代码根目录
  source: src,
  build, // 生成文件目录
  dist: build,

  packageMap
};
