[![Build Status](https://www.travis-ci.org/nanyuantingfeng/hollow-cli.svg?branch=master)](https://www.travis-ci.org/nanyuantingfeng/hollow-cli)

![](./assets/hollow.svg)


# hollow-cli 
>此工具是一个基于webpack 3.x 编写的一个零配置打包工具.

## 背景 
>webpack 3.x 已经做的相当完善,并没有一个通用的配置来简化操作,
>此工具提供一个的默认的基础配置的以适应大部分的开发场合.


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
    
* Babel [*.js, *.jsx, *.ts, *.tsx]
```javascript
    context.babelOptions = {
        cacheDirectory: tmpdir(),
        presets: [
          ['babel-preset-env', {modules: false}],
          'babel-preset-es2015',
          'babel-preset-react',
          'babel-preset-stage-0',
        ],
        plugins: [
          'babel-plugin-add-module-exports',
          'babel-plugin-external-helpers',
          'babel-plugin-transform-runtime',
          'babel-plugin-transform-regenerator',
          'babel-plugin-transform-undefined-to-void',
          'babel-plugin-transform-decorators-legacy',
          'babel-plugin-transform-regenerator',
        ],
      }
```
* Lazy [*.lazy.js, *.lazy.jsx]

* TypeScript [ *.ts ]
```javascript
    context.tsOptions = {
        transpileOnly: true,
        compilerOptions: {
          target: 'es2016',
          module: 'es2015',
          jsx: 'preserve',
          moduleResolution: 'node',
          declaration: false,
          sourceMap: false,
    
          allowSyntheticDefaultImports: true,
          lib: ['dom', 'es2015', 'es2016'],
          noImplicitAny: true,
          noUnusedLocals: true,
          noUnusedParameters: true,
          removeComments: false,
          preserveConstEnums: true,
          skipLibCheck: true
        }
      }
```

* Less  [ *.less ]
* PostCSS  [*.less, *.css]
```javascript
    context.postcssOptions = {
        sourceMap: true,
        plugins: [
          rucksack(),
          autoprefixer({
            browsers: [
              'last 2 versions',
              'Firefox ESR',
              '> 1%',
              'ie >= 8',
              'iOS >= 8',
              'Android >= 4'],
          }),
        ]
      }
```
* ModuleCSS [*.module.css, *.module.less]
* Font (url-loader) [*.woff, *.woff2, *.ttf, *.eot]
* IMG (url-loader) [*.svg, *.png, *.jpg, *.jpeg, *.gif] 
* HTML (file-loader)
* hbs (mustache-loader)
    
## 扩展
> 提供的默认配置表皆可修改.
> 在package.json 的同级目录下创建一个 webpack.config.js 文件

```javascript
module.exports = async function (context) {
 // do your need ... 
 //e. 
 // context.babelOptions.plugins.push("babel-plugin-xxx")
}
```

* 插件配置
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
 context.devtool = ""

 //all in one *
 context.webpackConfig = {}
```

* 定义环境变量
```javascript
 context.defines = {
   VERSION : '"1.0.0"',
   APP_NAME : '"DEMO"',
 }
```


* 需要复制的文件列表
```javascript
 context.files = {
   'whatwg-fetch': {path: 'node_modules/whatwg-fetch/fetch.js'},
   'es6-promise': {path: 'node_modules/es6-promise/dist/es6-promise.auto.min.js'},
   //...
 }  
```

* 排除的文件列表
```javascript
 context.externals = {
   'react': {name: 'React', path: 'node_modules/react/dist/react-with-addons.js'},
   'react-dom': {name: 'ReactDOM', path: 'node_modules/react-dom/dist/react-dom.js'},
   //...
 }
```

* 全局的引用 (详见 webpack)
```javascript
 context.provides = {
   React: 'react',
   ReactDOM: 'react-dom',
 }
```

* SDK (引用外部的 js 文件)
```javascript
 context.sdk = {
   index : [ "a.js", "b,js"],
   index1 : [ "a.js", "b,js", "c.js"],
   index2 : [ "a.js", "b,js", "d.js"],
 }
```
 

## DLL Plugin 的支持

```javascript
    //webpack.dll.js
    context.dll = ['react', 'react-dom', 'moment', 'prop-types', /* ... */]
    
    //webpack.config.js | webpack.build.js
    context.dll = true // === context.dll = './dll'
    context.dll = './src/dll'
```

## 其他

* babel-plugin-react-transform
* react-transform-hmr
> 在 react-hot-loader 配合 devServer 的时候需要的你在入口页面插入一段代码以保证
> 热更新启用
 
