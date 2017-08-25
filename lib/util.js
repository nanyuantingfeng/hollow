'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.chalk = exports.notifier = void 0;

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

exports.fnProgressHandler = fnProgressHandler;
exports.fnCheckWebpackConfig = fnCheckWebpackConfig;
exports.fnGetValueByPath = fnGetValueByPath;
exports.fnBuildCopyFiles = fnBuildCopyFiles;
exports.fnBuildExternals = fnBuildExternals;
exports.fnBuild4DevelopmentENV = fnBuild4DevelopmentENV;
exports.fnBuild4ProductionENV = fnBuild4ProductionENV;
exports.fnBuildHTMLData = fnBuildHTMLData;
exports.fnBuildHTML = fnBuildHTML;

var _nodeNotifier = require('node-notifier');

var _nodeNotifier2 = _interopRequireDefault(_nodeNotifier);

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**************************************************
 * Created by nanyuantingfeng on 11/06/2017 10:21.
 **************************************************/
exports.notifier = _nodeNotifier2.default;
exports.chalk = _chalk2.default;
function fnProgressHandler(percent, msg1, msg2) {
  var stream = process.stdout;
  if (stream.isTTY && percent < .70) {
    stream.cursorTo(0);
    stream.write('\u231B  ' + _chalk2.default.magenta(msg2) + ' ' + msg1);
    stream.clearLine(1);
  } else if (percent >= 1) {
    console.log(_chalk2.default.green('\nwebpack: bundle build is now finished'));
  }
}

function fnCheckWebpackConfig(webpackConfig) {
  var configs = Array.isArray(webpackConfig) ? webpackConfig : [webpackConfig];
  var hasEmptyEntry = configs.some(function (c) {
    return (0, _keys2.default)(c.entry || {}).length === 0;
  });
  if (hasEmptyEntry) {
    var e = new Error('no webpack entry found');
    e.name = 'NoEntry';
    throw e;
  }
}

function fnGetValueByPath(path) {
  return !_fs2.default.existsSync(path) ? {} : require(path);
}

function fnBuildCopyFiles(files) {
  if (Array.isArray(files)) {
    return files.map(function (from) {
      return { from: from };
    });
  }
  return (0, _keys2.default)(files).filter(function (key) {
    var file = files[key];
    return typeof file === 'string' || !!files[key].path;
  }).map(function (key) {
    var file = files[key];
    if (typeof file === 'string') {
      return { from: file };
    }
    return { from: file.path, to: file.to };
  });
}

function fnBuildExternals(files) {
  var ret = {};
  (0, _keys2.default)(files).forEach(function (key) {
    var file = files[key];
    if (typeof file === 'string') {
      ret[key] = file;
    } else if (file.name) {
      ret[key] = file.name;
    }
  });
  return ret;
}

function fnBuild4DevelopmentENV(filesMap) {
  var ret = [];
  (0, _keys2.default)(filesMap).forEach(function (key) {
    var line = filesMap[key];
    var path = line.path;
    if (line.name && path) {
      ret.push(path);
    }
  });
  return ret;
}

function fnBuild4ProductionENV(filesMap) {
  var ret = [];
  (0, _keys2.default)(filesMap).forEach(function (key) {
    var line = filesMap[key];
    var path = line.path;
    if (line.name && path) {
      var paths = path.split('/');
      path = paths[paths.length - 1];
      ret.push(path);
    }
  });
  return ret;
}

function fnBuildHTMLData(filesMap, env) {
  switch (env) {
    case 'production':
    case 'beta':
      return fnBuild4ProductionENV(filesMap);
    default:
      return fnBuild4DevelopmentENV(filesMap);
  }
}

function fnBuildHTML(context, env) {
  var _context$externals = context.externals,
      externals = _context$externals === void 0 ? {} : _context$externals,
      _context$sdks = context.sdks,
      sdks = _context$sdks === void 0 ? {} : _context$sdks,
      htmlWebpackPluginOptions = context.htmlWebpackPluginOptions;


  var entry = context.entry || context.packageMap.entry;

  if (!entry) {
    throw new Error('entry is an invalid value');
  }

  if (typeof entry === 'string') {
    entry = { index: entry };
  }
  var paths = fnBuildHTMLData(externals, env);
  var entryNames = (0, _keys2.default)(entry);

  var options = (0, _extends3.default)({
    template: _path2.default.join(__dirname, '../index.hbs'),
    favicon: _path2.default.join(__dirname, '../favicon.ico')
  }, htmlWebpackPluginOptions);

  return entryNames.map(function (name) {
    var excludes = entryNames.filter(function (line) {
      return line !== name;
    });
    var sdk = sdks[name];

    if (typeof sdk === 'string') {
      sdk = [sdk];
    }

    var paths0 = paths.slice(0);

    if (sdk) {
      paths0.push.apply(paths0, (0, _toConsumableArray3.default)(sdk));
    }

    return (0, _extends3.default)({
      PATHS: paths0,
      filename: name + '.html',
      excludeChunks: excludes
    }, options);
  });
}