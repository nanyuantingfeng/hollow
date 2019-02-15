[![Build Status](https://www.travis-ci.org/nanyuantingfeng/hollow-cli.svg?branch=master)](https://www.travis-ci.org/nanyuantingfeng/hollow-cli)

![](./assets/hollow.svg)

# hollow-cli

> 一个基于 webpack4 + babel7 + happypack 编写的一个零配置打包工具.

## 背景

> webpack 4.x 已经做的相当完善,并没有一个通用的配置来简化操作,
> 此工具提供一个的默认的基础配置的以适应大部分的开发场合.

## 使用方式

```bash
    npm i hollow-cli --save-dev
```

```CLI
    hollow dev -p 9999
    hollow build
    hollow dll
    =======================
    > 其他参数详见
    > hollow dev -h
    > hollow build -h
```

## 默认提供的能力

- GraphQL [*.graphql, *.gql]

- Babel [*.js, *.jsx, *.ts, *.tsx]

```javascript
    context.babelOptions = {
      '@babel/preset-env',
      {
        targets: {
          browsers: ['last 2 versions', 'safari >= 7', 'IE >= 11']
        },
        modules: false,
        useBuiltIns: false
      }
    ],
    '@babel/preset-react'
        plugins: [
       '@babel/plugin-external-helpers',
       '@babel/plugin-transform-runtime',
       '@babel/plugin-transform-object-assign',
       '@babel/plugin-syntax-dynamic-import',
       '@babel/plugin-syntax-import-meta',
       '@babel/plugin-proposal-async-generator-functions',
       '@babel/plugin-transform-regenerator',
       '@babel/plugin-syntax-function-bind',
       [
         '@babel/plugin-proposal-decorators',
         {
           legacy: true
         }
       ],
       [
         '@babel/plugin-proposal-class-properties',
         {
           loose: true
         }
       ],

       'babel-plugin-lodash'
        ]
      }
```

- TypeScript [ *.ts ,*.tsx ]

```json
{
  "compilerOptions": {
    "importHelpers": true,
    "allowSyntheticDefaultImports": true,
    "sourceMap": false,
    "declaration": true,
    "target": "es5",
    "module": "commonjs",
    "moduleResolution": "node",
    "jsx": "react",
    "esModuleInterop": true,
    "noEmitOnError": true,
    "noFallthroughCasesInSwitch": true,
    "noImplicitAny": true,
    "noImplicitReturns": true,
    "noResolve": false,
    "removeComments": true,
    "strictNullChecks": false,
    "inlineSourceMap": false,
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "outDir": "dist/lib",
    "rootDir": "src",
    "skipLibCheck": true,
    "lib": [
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
}
```

- Less [ *.less ]
- PostCSS [*.less, *.css]

```javascript
context.postcssOptions = {
  sourceMap: true,
  plugins: [
    autoprefixer({
      browsers: ['last 2 versions', 'Firefox ESR', '> 1%', 'ie >= 8', 'iOS >= 8', 'Android >= 4']
    })
  ]
}
```

- ModuleCSS [*.module.css, *.module.less]
- Font (file-loader) [*.woff, *.woff2, *.ttf, *.eot]
- IMG (file-loader) [*.svg, *.png, *.jpg, *.jpeg, *.gif]
- HTML (file-loader)
- hbs (mustache-loader)

## 扩展

> 提供的默认配置表皆可修改.
> 在 package.json 的同级目录下创建一个 webpack.config.js 文件

```javascript
module.exports = async function(context) {
  // do your need ...
  //e.
  // context.babelOptions.plugins.push("babel-plugin-xxx")
}
```

- 插件配置

```javascript
//Babel
context.babelOptions = {}

//loaders
context.rules = []

//postcss
context.postcssOptions = {}

//typescript
context.tsOptions = {}

//source-map
context.devtool = ''

//all in one *
context.webpackConfig = {}
```

- 定义环境变量

```javascript
context.defines = {
  VERSION: '"1.0.0"',
  APP_NAME: '"DEMO"'
}
```

- 需要复制的文件列表

```javascript
context.files = {
  'whatwg-fetch': { path: 'node_modules/whatwg-fetch/fetch.js' },
  'es6-promise': { path: 'node_modules/es6-promise/dist/es6-promise.auto.min.js' }
  //...
}
```

- 排除的文件列表

```javascript
context.externals = {
  react: { name: 'React', path: 'node_modules/react/dist/react-with-addons.js' },
  'react-dom': { name: 'ReactDOM', path: 'node_modules/react-dom/dist/react-dom.js' }
  //...
}
```

- 全局的引用 (详见 webpack)

```javascript
context.provides = {
  React: 'react',
  ReactDOM: 'react-dom'
}
```

- SDK (引用外部的 js 文件)

```javascript
context.sdk = {
  index: ['a.js', 'b,js'],
  index1: ['a.js', 'b,js', 'c.js'],
  index2: ['a.js', 'b,js', 'd.js']
}
```

## DLL Plugin 的支持

```javascript
//webpack.dll.js
context.dll = ['react', 'react-dom', 'moment', 'prop-types' /* ... */]

//webpack.config.js | webpack.build.js
context.dll = true // === context.dll = './dll'
context.dll = './src/dll'
```
