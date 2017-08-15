'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {

  return {
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
  };
};

module.exports = exports['default']; /**************************************************
                                      * Created by nanyuantingfeng on 11/06/2017 04:25.
                                      **************************************************/