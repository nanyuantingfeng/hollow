/***************************************************
 * Created by nanyuantingfeng on 2019-06-25 16:48. *
 ***************************************************/
const fs = require("fs");
const path = require("path");
const { isDevelopment, cwd } = require("./const.env");

let options = {
  compilerOptions: {
    importHelpers: true,
    allowSyntheticDefaultImports: true,
    sourceMap: false,
    declaration: true,
    target: "es5",
    module: "ESNEXT",
    moduleResolution: "node",
    jsx: "react",
    esModuleInterop: true,
    strictFunctionTypes: true,
    noEmitOnError: true,
    noFallthroughCasesInSwitch: true,
    noImplicitAny: true,
    noImplicitReturns: true,
    noResolve: false,
    removeComments: true,
    strictNullChecks: false,
    inlineSourceMap: false,
    emitDecoratorMetadata: true,
    experimentalDecorators: true,
    outDir: "dist/lib",
    rootDir: "src",
    skipLibCheck: true,
    lib: [
      "dom",
      "es5",
      "es6",
      "es7",
      "es2015.promise",
      "es2018.promise",
      "es2015.collection",
      "es2015.core",
      "es2015",
      "es2016",
      "es2016.array.include",
      "es2017",
      "es2017.object",
      "es2018",
      "es2015.iterable"
    ]
  }
};

const tsconfigPath = path.resolve(cwd, "tsconfig.json");

if (fs.existsSync(tsconfigPath)) {
  options = require(tsconfigPath);
}

options.compilerOptions.sourceMap = isDevelopment;
// 因为在后面 ts-loader 里面修正了 babel-loader 的链式调用,
// 所以这边使用的 `module='ESNEXT'` 使其不处理导出方式
options.compilerOptions.module = "ESNEXT";

/* GQL
const { getTransformer } = require("ts-transform-graphql-tag");
options.getCustomTransformers = () => ({ before: [getTransformer()] });

*/

module.exports = {
  transpileOnly: true,
  experimentalWatchApi: true,
  compilerOptions: options.compilerOptions
};
