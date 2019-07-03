
module.export = {
  mode: 'development',
  context: '/Users/nanyuantingfeng/Repositories/github/hollow-cli/demo',
  externals: [
    {}
  ],
  node: {
    child_process: 'empty',
    cluster: 'empty',
    dgram: 'empty',
    dns: 'empty',
    fs: 'empty',
    module: 'empty',
    net: 'empty',
    readline: 'empty',
    repl: 'empty',
    tls: 'empty'
  },
  output: {
    path: '/Users/nanyuantingfeng/Repositories/github/hollow-cli/demo/build',
    filename: '[name]-[contenthash].js',
    chunkFilename: '[name].chunk-[contenthash].js',
    globalObject: 'this',
    pathinfo: true,
    publicPath: 'http://xxxxxa/da/dd'
  },
  resolve: {
    alias: {
      '@babel/runtime': '/Users/nanyuantingfeng/Repositories/github/hollow-cli/node_modules/@babel/runtime',
      'babel-core': '/Users/nanyuantingfeng/Repositories/github/hollow-cli/node_modules/babel-core',
      tslib: '/Users/nanyuantingfeng/Repositories/github/hollow-cli/node_modules/tslib'
    },
    extensions: [
      '.web.tsx',
      '.web.ts',
      '.web.jsx',
      '.web.js',
      '.ts',
      '.tsx',
      '.js',
      '.jsx',
      '.json',
      '.json5',
      '.worker.js',
      '.worker.jsx',
      '.mjs',
      '.mjsx'
    ]
  },
  devServer: {
    hot: true,
    hotOnly: true,
    contentBase: '/Users/nanyuantingfeng/Repositories/github/hollow-cli/demo',
    watchContentBase: false,
    compress: true,
    progress: true,
    quiet: false,
    disableHostCheck: true,
    clientLogLevel: 'none',
    overlay: false,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    historyApiFallback: {
      disableDotRule: true
    },
    stats: {
      all: undefined,
      assets: true,
      assetsSort: 'field',
      builtAt: true,
      reasons: true,
      colors: true,
      version: true,
      children: true,
      hash: false,
      timings: true,
      warnings: false,
      performance: false,
      cached: false,
      cachedAssets: false,
      chunks: false,
      modules: false,
      chunkModules: false,
      env: true,
      depth: false,
      exclude: /node_modules/
    }
  },
  module: {
    unknownContextCritical: false,
    noParse: [
      /moment$/
    ],
    strictExportPresence: false,
    rules: [
      /* config.module.rule('css') */
      {
        test: /\.css$/,
        oneOf: [
          /* config.module.rule('css').oneOf('modules') */
          {
            resource: /module/,
            use: [
              /* config.module.rule('css').oneOf('modules').use('style-loader') */
              {
                loader: 'style-loader'
              },
              /* config.module.rule('css').oneOf('modules').use('css-loader') */
              {
                loader: 'css-loader',
                options: {
                  sourceMap: true,
                  modules: {
                    localIdentName: '[local]--[hash:base64:8]'
                  }
                }
              },
              /* config.module.rule('css').oneOf('modules').use('postcss-loader') */
              {
                loader: 'postcss-loader',
                options: {
                  plugins: [
                    function () { /* omitted long function */ },
                    function () { /* omitted long function */ }
                  ],
                  sourceMap: true
                }
              }
            ]
          },
          /* config.module.rule('css').oneOf('normal') */
          {
            use: [
              /* config.module.rule('css').oneOf('normal').use('style-loader') */
              {
                loader: 'style-loader'
              },
              /* config.module.rule('css').oneOf('normal').use('css-loader') */
              {
                loader: 'css-loader',
                options: {
                  sourceMap: true,
                  modules: false
                }
              },
              /* config.module.rule('css').oneOf('normal').use('postcss-loader') */
              {
                loader: 'postcss-loader',
                options: {
                  plugins: [
                    function () { /* omitted long function */ },
                    function () { /* omitted long function */ }
                  ],
                  sourceMap: true
                }
              }
            ]
          }
        ]
      },
      /* config.module.rule('less') */
      {
        test: /\.less$/,
        oneOf: [
          /* config.module.rule('less').oneOf('modules') */
          {
            resource: /module/,
            use: [
              /* config.module.rule('less').oneOf('modules').use('style-loader') */
              {
                loader: 'style-loader'
              },
              /* config.module.rule('less').oneOf('modules').use('css-loader') */
              {
                loader: 'css-loader',
                options: {
                  sourceMap: true,
                  modules: {
                    localIdentName: '[local]--[hash:base64:8]'
                  }
                }
              },
              /* config.module.rule('less').oneOf('modules').use('postcss-loader') */
              {
                loader: 'postcss-loader',
                options: {
                  plugins: [
                    function () { /* omitted long function */ },
                    function () { /* omitted long function */ }
                  ],
                  sourceMap: true
                }
              },
              /* config.module.rule('less').oneOf('modules').use('less-loader') */
              {
                loader: 'less-loader',
                options: {
                  javascriptEnabled: true,
                  sourceMap: true,
                  modifyVars: {}
                }
              }
            ]
          },
          /* config.module.rule('less').oneOf('normal') */
          {
            use: [
              /* config.module.rule('less').oneOf('normal').use('style-loader') */
              {
                loader: 'style-loader'
              },
              /* config.module.rule('less').oneOf('normal').use('css-loader') */
              {
                loader: 'css-loader',
                options: {
                  sourceMap: true,
                  modules: false
                }
              },
              /* config.module.rule('less').oneOf('normal').use('postcss-loader') */
              {
                loader: 'postcss-loader',
                options: {
                  plugins: [
                    function () { /* omitted long function */ },
                    function () { /* omitted long function */ }
                  ],
                  sourceMap: true
                }
              },
              /* config.module.rule('less').oneOf('normal').use('less-loader') */
              {
                loader: 'less-loader',
                options: {
                  javascriptEnabled: true,
                  sourceMap: true,
                  modifyVars: {}
                }
              }
            ]
          }
        ]
      },
      /* config.module.rule('svgx') */
      {
        test: /\.svgx$/,
        use: [
          /* config.module.rule('svgx').use('svgx') */
          {
            loader: '@svgr/webpack'
          }
        ]
      },
      /* config.module.rule('json5') */
      {
        test: /\.json5$/,
        use: [
          /* config.module.rule('json5').use('json5') */
          {
            loader: 'json5-loader'
          }
        ]
      },
      /* config.module.rule('font') */
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          /* config.module.rule('font').use('font') */
          {
            loader: 'file-loader',
            options: {
              limit: 10240,
              mimetype: 'application/vnd.ms-fontobject'
            }
          }
        ]
      },
      /* config.module.rule('svg') */
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          /* config.module.rule('svg').use('svg') */
          {
            loader: 'file-loader',
            options: {
              limit: 10240,
              mimetype: 'image/svg+xml'
            }
          }
        ]
      },
      /* config.module.rule('img') */
      {
        test: /\.(bmp|png|jpe?g|gif)(\?v=\d+\.\d+\.\d+)?$/i,
        use: [
          /* config.module.rule('img').use('img') */
          {
            loader: 'url-loader',
            options: {
              limit: 10240,
              name: 'static/media/[name].[hash:8].[ext]'
            }
          }
        ]
      },
      /* config.module.rule('html') */
      {
        test: /\.html?$/,
        use: [
          /* config.module.rule('html').use('html') */
          {
            loader: 'file-loader',
            options: {
              name: '[path]-[name].[ext]'
            }
          }
        ]
      },
      /* config.module.rule('hbs') */
      {
        test: /\.hbs?$/,
        use: [
          /* config.module.rule('hbs').use('hbs') */
          {
            loader: 'mustache-loader'
          }
        ]
      },
      /* config.module.rule('jsx') */
      {
        test: /\.jsx?$/,
        exclude: [
          /node_modules/
        ],
        oneOf: [
          /* config.module.rule('jsx').oneOf('workers') */
          {
            resource: /worker/,
            use: [
              /* config.module.rule('jsx').oneOf('workers').use('workerize') */
              {
                loader: 'workerize-loader'
              },
              /* config.module.rule('jsx').oneOf('workers').use('babel') */
              {
                loader: 'babel-loader',
                options: {
                  cacheDirectory: true,
                  babelrc: false,
                  highlightCode: true,
                  presets: [
                    [
                      '@babel/preset-env',
                      {
                        targets: {
                          chrome: '39',
                          edge: '12',
                          ie: '10',
                          firefox: '33',
                          safari: '9',
                          node: '4',
                          ios: '9'
                        },
                        modules: false,
                        useBuiltIns: 'entry',
                        corejs: 3
                      }
                    ],
                    '@babel/preset-react'
                  ],
                  plugins: [
                    '@babel/plugin-external-helpers',
                    '@babel/plugin-transform-runtime',
                    '@babel/plugin-transform-object-assign',
                    '@babel/plugin-syntax-dynamic-import',
                    '@babel/plugin-proposal-async-generator-functions',
                    '@babel/plugin-transform-regenerator',
                    '@babel/plugin-proposal-function-bind',
                    '@babel/plugin-proposal-object-rest-spread',
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
                    'babel-plugin-lodash',
                    'babel-plugin-dynamic-import-node'
                  ]
                }
              }
            ]
          },
          /* config.module.rule('jsx').oneOf('normal') */
          {
            use: [
              /* config.module.rule('jsx').oneOf('normal').use('babel') */
              {
                loader: 'babel-loader',
                options: {
                  cacheDirectory: true,
                  babelrc: false,
                  highlightCode: true,
                  presets: [
                    [
                      '@babel/preset-env',
                      {
                        targets: {
                          chrome: '39',
                          edge: '12',
                          ie: '10',
                          firefox: '33',
                          safari: '9',
                          node: '4',
                          ios: '9'
                        },
                        modules: false,
                        useBuiltIns: 'entry',
                        corejs: 3
                      }
                    ],
                    '@babel/preset-react'
                  ],
                  plugins: [
                    '@babel/plugin-external-helpers',
                    '@babel/plugin-transform-runtime',
                    '@babel/plugin-transform-object-assign',
                    '@babel/plugin-syntax-dynamic-import',
                    '@babel/plugin-proposal-async-generator-functions',
                    '@babel/plugin-transform-regenerator',
                    '@babel/plugin-proposal-function-bind',
                    '@babel/plugin-proposal-object-rest-spread',
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
                    'babel-plugin-lodash',
                    'babel-plugin-dynamic-import-node'
                  ]
                }
              }
            ]
          }
        ]
      },
      /* config.module.rule('tsx') */
      {
        test: /\.tsx?$/,
        exclude: [
          /node_modules/
        ],
        oneOf: [
          /* config.module.rule('tsx').oneOf('workers') */
          {
            resource: /worker/,
            use: [
              /* config.module.rule('tsx').oneOf('workers').use('workerize') */
              {
                loader: 'workerize-loader'
              },
              /* config.module.rule('tsx').oneOf('workers').use('babel') */
              {
                loader: 'babel-loader',
                options: {
                  cacheDirectory: true,
                  babelrc: false,
                  highlightCode: true,
                  presets: [
                    [
                      '@babel/preset-env',
                      {
                        targets: {
                          chrome: '39',
                          edge: '12',
                          ie: '10',
                          firefox: '33',
                          safari: '9',
                          node: '4',
                          ios: '9'
                        },
                        modules: false,
                        useBuiltIns: 'entry',
                        corejs: 3
                      }
                    ],
                    '@babel/preset-react'
                  ],
                  plugins: [
                    '@babel/plugin-external-helpers',
                    '@babel/plugin-transform-runtime',
                    '@babel/plugin-transform-object-assign',
                    '@babel/plugin-syntax-dynamic-import',
                    '@babel/plugin-proposal-async-generator-functions',
                    '@babel/plugin-transform-regenerator',
                    '@babel/plugin-proposal-function-bind',
                    '@babel/plugin-proposal-object-rest-spread',
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
                    'babel-plugin-lodash',
                    'babel-plugin-dynamic-import-node'
                  ]
                }
              },
              /* config.module.rule('tsx').oneOf('workers').use('ts') */
              {
                loader: 'ts-loader',
                options: {
                  transpileOnly: true,
                  experimentalWatchApi: true,
                  compilerOptions: {
                    importHelpers: true,
                    allowSyntheticDefaultImports: true,
                    sourceMap: true,
                    declaration: true,
                    target: 'es5',
                    module: 'ESNEXT',
                    moduleResolution: 'node',
                    jsx: 'react',
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
                    outDir: 'dist/lib',
                    rootDir: 'src',
                    skipLibCheck: true,
                    lib: [
                      'dom',
                      'es5',
                      'es6',
                      'es7',
                      'es2015.promise',
                      'es2018.promise',
                      'es2015.collection',
                      'es2015.core',
                      'es2015',
                      'es2016',
                      'es2016.array.include',
                      'es2017',
                      'es2017.object',
                      'es2018',
                      'es2015.iterable'
                    ]
                  }
                }
              }
            ]
          },
          /* config.module.rule('tsx').oneOf('normal') */
          {
            use: [
              /* config.module.rule('tsx').oneOf('normal').use('babel') */
              {
                loader: 'babel-loader',
                options: {
                  cacheDirectory: true,
                  babelrc: false,
                  highlightCode: true,
                  presets: [
                    [
                      '@babel/preset-env',
                      {
                        targets: {
                          chrome: '39',
                          edge: '12',
                          ie: '10',
                          firefox: '33',
                          safari: '9',
                          node: '4',
                          ios: '9'
                        },
                        modules: false,
                        useBuiltIns: 'entry',
                        corejs: 3
                      }
                    ],
                    '@babel/preset-react'
                  ],
                  plugins: [
                    '@babel/plugin-external-helpers',
                    '@babel/plugin-transform-runtime',
                    '@babel/plugin-transform-object-assign',
                    '@babel/plugin-syntax-dynamic-import',
                    '@babel/plugin-proposal-async-generator-functions',
                    '@babel/plugin-transform-regenerator',
                    '@babel/plugin-proposal-function-bind',
                    '@babel/plugin-proposal-object-rest-spread',
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
                    'babel-plugin-lodash',
                    'babel-plugin-dynamic-import-node'
                  ]
                }
              },
              /* config.module.rule('tsx').oneOf('normal').use('ts') */
              {
                loader: 'ts-loader',
                options: {
                  transpileOnly: true,
                  experimentalWatchApi: true,
                  compilerOptions: {
                    importHelpers: true,
                    allowSyntheticDefaultImports: true,
                    sourceMap: true,
                    declaration: true,
                    target: 'es5',
                    module: 'ESNEXT',
                    moduleResolution: 'node',
                    jsx: 'react',
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
                    outDir: 'dist/lib',
                    rootDir: 'src',
                    skipLibCheck: true,
                    lib: [
                      'dom',
                      'es5',
                      'es6',
                      'es7',
                      'es2015.promise',
                      'es2018.promise',
                      'es2015.collection',
                      'es2015.core',
                      'es2015',
                      'es2016',
                      'es2016.array.include',
                      'es2017',
                      'es2017.object',
                      'es2018',
                      'es2015.iterable'
                    ]
                  }
                }
              }
            ]
          }
        ]
      },
      /* config.module.rule('mjsx') */
      {
        test: /\.mjsx?$/,
        type: 'javascript/auto'
      }
    ]
  },
  optimization: {
    runtimeChunk: false,
    removeAvailableModules: true,
    removeEmptyChunks: true,
    mergeDuplicateChunks: true,
    sideEffects: false,
    flagIncludedChunks: true,
    occurrenceOrder: true,
    concatenateModules: true,
    usedExports: true,
    providedExports: true,
    noEmitOnErrors: true,
    namedModules: true,
    namedChunks: true
  },
  plugins: [
    /* config.plugin('DefinePlugin') */
    new DefinePlugin(
      {
        __DEV__: true,
        VERSION: '"1.0.0"',
        APPLICATION_VERSION: '"v1.0.0-dev"',
        'process.env.NODE_ENV': '"development"',
        'process.env.ASSET_PATH': '"http://xxxxxa/da/dd"'
      }
    ),
    /* config.plugin('WatchIgnorePlugin') */
    new WatchIgnorePlugin(
      [
        /\.d\.ts$/
      ]
    ),
    /* config.plugin('CaseSensitivePathsPlugin') */
    new CaseSensitivePathsPlugin(),
    /* config.plugin('IgnorePlugin') */
    new IgnorePlugin(
      /^\.\/locale$/,
      /moment$/
    ),
    /* config.plugin('LodashWebpackPlugin') */
    new Plugin(
      {
        shorthands: true,
        paths: true,
        cloning: true,
        flattening: true,
        exotics: true,
        collections: true,
        caching: true
      }
    ),
    /* config.plugin('CopyWebpackPlugin') */
    new CopyPlugin(
      []
    ),
    /* config.plugin('HtmlWebpackPlugin') */
    new HtmlWebpackPlugin(
      {
        inject: true,
        entryName: 'index0',
        cdnModule: 'index0',
        filename: 'index0.html',
        chunks: [
          'index0'
        ],
        chunksSortMode: 'dependency',
        template: '/Users/nanyuantingfeng/Repositories/github/hollow-cli/assets/index.hbs',
        favicon: '/Users/nanyuantingfeng/Repositories/github/hollow-cli/assets/favicon.ico',
        templateParameters: (compilation, assets, options) => {
            const entryName = options.entryName
            const stats = compilation.getStats().toJson()
            const currentAssets = stats.entrypoints[entryName].assets
        
            const js = currentAssets.filter(n => path.extname(n) === '.js').map(a => fixPublicPath(compilation.options, a))
            const css = currentAssets.filter(n => path.extname(n) === '.css').map(a => fixPublicPath(compilation.options, a))
            const scripts2 = scripts.map(a => fixPublicPath(compilation.options, a))
        
            assets.js = unique(scripts2.concat(assets.js).concat(js))
            assets.css = unique(assets.css.concat(css))
        
            return {
              compilation: compilation,
              webpack: compilation.getStats().toJson(),
              webpackConfig: compilation.options,
        
              htmlWebpackPlugin: {
                files: assets,
                options: options,
                scripts: js,
                styles: css,
                cdnModule: entryName
              }
            }
          }
      }
    ),
    /* config.plugin('HtmlWebpackPlugin::index1') */
    new HtmlWebpackPlugin(
      {
        inject: true,
        entryName: 'index1',
        cdnModule: 'index1',
        filename: 'index1.html',
        chunks: [
          'index1'
        ],
        chunksSortMode: 'dependency',
        template: '/Users/nanyuantingfeng/Repositories/github/hollow-cli/assets/index.hbs',
        favicon: '/Users/nanyuantingfeng/Repositories/github/hollow-cli/assets/favicon.ico',
        templateParameters: (compilation, assets, options) => {
            const entryName = options.entryName
            const stats = compilation.getStats().toJson()
            const currentAssets = stats.entrypoints[entryName].assets
        
            const js = currentAssets.filter(n => path.extname(n) === '.js').map(a => fixPublicPath(compilation.options, a))
            const css = currentAssets.filter(n => path.extname(n) === '.css').map(a => fixPublicPath(compilation.options, a))
            const scripts2 = scripts.map(a => fixPublicPath(compilation.options, a))
        
            assets.js = unique(scripts2.concat(assets.js).concat(js))
            assets.css = unique(assets.css.concat(css))
        
            return {
              compilation: compilation,
              webpack: compilation.getStats().toJson(),
              webpackConfig: compilation.options,
        
              htmlWebpackPlugin: {
                files: assets,
                options: options,
                scripts: js,
                styles: css,
                cdnModule: entryName
              }
            }
          }
      }
    ),
    /* config.plugin('HtmlWebpackPlugin::index2') */
    new HtmlWebpackPlugin(
      {
        inject: true,
        entryName: 'index2',
        cdnModule: 'index2',
        filename: 'index2.html',
        chunks: [
          'index2'
        ],
        chunksSortMode: 'dependency',
        template: '/Users/nanyuantingfeng/Repositories/github/hollow-cli/assets/index.hbs',
        favicon: '/Users/nanyuantingfeng/Repositories/github/hollow-cli/assets/favicon.ico',
        templateParameters: (compilation, assets, options) => {
            const entryName = options.entryName
            const stats = compilation.getStats().toJson()
            const currentAssets = stats.entrypoints[entryName].assets
        
            const js = currentAssets.filter(n => path.extname(n) === '.js').map(a => fixPublicPath(compilation.options, a))
            const css = currentAssets.filter(n => path.extname(n) === '.css').map(a => fixPublicPath(compilation.options, a))
            const scripts2 = scripts.map(a => fixPublicPath(compilation.options, a))
        
            assets.js = unique(scripts2.concat(assets.js).concat(js))
            assets.css = unique(assets.css.concat(css))
        
            return {
              compilation: compilation,
              webpack: compilation.getStats().toJson(),
              webpackConfig: compilation.options,
        
              htmlWebpackPlugin: {
                files: assets,
                options: options,
                scripts: js,
                styles: css,
                cdnModule: entryName
              }
            }
          }
      }
    ),
    /* config.plugin('HtmlWebpackPlugin::index3') */
    new HtmlWebpackPlugin(
      {
        inject: true,
        entryName: 'index3',
        cdnModule: 'index3',
        filename: 'index3.html',
        chunks: [
          'index3'
        ],
        chunksSortMode: 'dependency',
        template: '/Users/nanyuantingfeng/Repositories/github/hollow-cli/assets/index.hbs',
        favicon: '/Users/nanyuantingfeng/Repositories/github/hollow-cli/assets/favicon.ico',
        templateParameters: (compilation, assets, options) => {
            const entryName = options.entryName
            const stats = compilation.getStats().toJson()
            const currentAssets = stats.entrypoints[entryName].assets
        
            const js = currentAssets.filter(n => path.extname(n) === '.js').map(a => fixPublicPath(compilation.options, a))
            const css = currentAssets.filter(n => path.extname(n) === '.css').map(a => fixPublicPath(compilation.options, a))
            const scripts2 = scripts.map(a => fixPublicPath(compilation.options, a))
        
            assets.js = unique(scripts2.concat(assets.js).concat(js))
            assets.css = unique(assets.css.concat(css))
        
            return {
              compilation: compilation,
              webpack: compilation.getStats().toJson(),
              webpackConfig: compilation.options,
        
              htmlWebpackPlugin: {
                files: assets,
                options: options,
                scripts: js,
                styles: css,
                cdnModule: entryName
              }
            }
          }
      }
    )
  ],
  entry: {
    index0: [
      './1.js'
    ],
    index1: [
      './2.js'
    ],
    index2: [
      './3.js'
    ],
    index3: [
      './4.js'
    ]
  }
}
