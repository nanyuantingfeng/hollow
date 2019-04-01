[![Build Status](https://www.travis-ci.org/nanyuantingfeng/hollow-cli.svg?branch=master)](https://www.travis-ci.org/nanyuantingfeng/hollow-cli)

![](./assets/hollow.svg)

# hollow-cli

> Base on Webpack 4.x/Babel 7.x/Happypack 5.x /TS 3.x Zero configuration Packaging Tools.

> webpack 4.x has been quite well developed, but there is no general configuration to simplify operations.
> this tool provides a default base configuration for most development situations.

## Usage

```bash
    npm i -D hollow-cli
```

```CLI
    hollow dev -p 9999
    hollow build
    hollow dll
    =======================
    > others :
    > hollow dev -h
    > hollow build -h
```

````js
// must be provide a entry
// webpack.config.js
module.exports = context => {
  // context.entry = './src/index.js'
  context.entry = {
    index: './src/index.js',
    index2: './src/index2.js'
  }
}

/*   OR : package.json */
;```json
     {
         // "entry" : "./src/index.js"
          "entry" : {
             "index" :"./src/index.js"
             "index2" : "./src/index2.js"
            }
          }
    ```

/** OR :
 *   if you don`t provide "entry",
 *   "entry" is ./example/index.[jt]sx?
 * **/
````

## Default Provider

- GraphQL `[*.graphql, *.gql]`

- Babel `[*.js, *.jsx]`

  @babel/preset-env

  ```
    browsers: ['last 2 versions', 'safari >= 7', 'IE >= 11']
  ```

  - @babel/preset-react
  - @babel/plugin-external-helpers
  - @babel/plugin-transform-runtime
  - @babel/plugin-transform-object-assign
  - @babel/plugin-syntax-dynamic-import
  - @babel/plugin-syntax-import-meta
  - @babel/plugin-proposal-async-generator-functions
  - @babel/plugin-transform-regenerator
  - @babel/plugin-proposal-decorators `:legacy`
  - @babel/plugin-proposal-class-properties `:loose`
  - babel-plugin-lodash

- TypeScript `[ *.ts ,*.tsx ]`

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

- Less `[ *.less ]`

- PostCSS `[*.less, *.css]`

  ```
   browsers: ['last 2 versions', 'Firefox ESR', '> 1%', 'ie >= 8', 'iOS >= 8', 'Android >= 4']
  ```

- Module CSS `[*.module.css, *.module.less]`
- Font (file-loader) `[*.woff, *.woff2, *.ttf, *.eot]`
- IMG (file-loader) `[*.svg, *.png, *.jpg, *.jpeg, *.gif]`
- HTML (file-loader)
- HBS (mustache-loader)

## Extensible

> 提供的默认配置表皆可修改.
> 在 package.json 的同级目录下创建一个 webpack.config.js 文件

```javascript
module.exports = async function(context) {
  // do your need ...
  //e.
  // context.babelOptions.plugins.push("babel-plugin-xxx")
}
```

- Plugin configuration

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

- ENV Variables

* `VERSION` : `e.g. 1.0.0`
* `APPLICATION_VERSION`: `e.g. 1.0.0-beta / 1.0.0-dev / 1.0.0`
* `__DEV__` : is development

```javascript
context.defines = {
  VERSION: '"1.0.0"',
  APP_NAME: '"DEMO"'
}
```

- Copy Files to Dist

```javascript
context.files = {
  'whatwg-fetch': { path: 'node_modules/whatwg-fetch/fetch.js' },
  'es6-promise': { path: 'node_modules/es6-promise/dist/es6-promise.auto.min.js' }
  //...
}
```

- Externals Files

```javascript
context.externals = {
  react: { name: 'React', path: 'node_modules/react/dist/react-with-addons.js' },
  'react-dom': { name: 'ReactDOM', path: 'node_modules/react-dom/dist/react-dom.js' }
  //...
}
```

- Global Provides

```javascript
context.provides = {
  React: 'react',
  ReactDOM: 'react-dom'
}
```

- SDK (include CDN Files)

```javascript
context.sdk = {
  index: ['a.js', 'b,js', 'http://xxx/xxx/xxx.js'],
  index1: ['a.js', 'b,js', 'c.js', 'http://xxx/xxx/xxx.js'],
  index2: ['a.js', 'b,js', 'd.js', 'http://xxx/xxx/xxx.js']
}
```

## DLL Support

```javascript
//webpack.dll.js
context.dll = ['react', 'react-dom', 'moment' /* ... */]

//webpack.config.js | webpack.build.js
context.dll = true // === context.dll = './dll'
context.dll = './src/dll'
```
