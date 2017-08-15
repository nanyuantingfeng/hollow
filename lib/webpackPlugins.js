'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mapJSONWebpackPlugin = exports.FriendlyErrorsWebpackPlugin = exports.CaseSensitivePathsPlugin = exports.HtmlWebpackPlugin = exports.ExtractTextPlugin = exports.HotModuleReplacementPlugin = exports.NamedModulesPlugin = exports.NoEmitOnErrorsPlugin = exports.LoaderOptionsPlugin = exports.CommonsChunkPlugin = exports.UglifyJsPlugin = exports.ProgressPlugin = exports.DefinePlugin = exports.webpack = void 0;

var _caseSensitivePathsWebpackPlugin = require('case-sensitive-paths-webpack-plugin');

var _caseSensitivePathsWebpackPlugin2 = _interopRequireDefault(_caseSensitivePathsWebpackPlugin);

var _friendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

var _friendlyErrorsWebpackPlugin2 = _interopRequireDefault(_friendlyErrorsWebpackPlugin);

var _extractTextWebpackPlugin = require('extract-text-webpack-plugin');

var _extractTextWebpackPlugin2 = _interopRequireDefault(_extractTextWebpackPlugin);

var _htmlWebpackPlugin = require('html-webpack-plugin');

var _htmlWebpackPlugin2 = _interopRequireDefault(_htmlWebpackPlugin);

var _webpack = require('webpack');

var _webpack2 = _interopRequireDefault(_webpack);

var _mapJsonWebpackPlugin = require('map-json-webpack-plugin');

var _mapJsonWebpackPlugin2 = _interopRequireDefault(_mapJsonWebpackPlugin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**************************************************
 * Created by nanyuantingfeng on 11/06/2017 04:26.
 **************************************************/
var optimize = _webpack2.default.optimize,
    LoaderOptionsPlugin = _webpack2.default.LoaderOptionsPlugin,
    DefinePlugin = _webpack2.default.DefinePlugin,
    NamedModulesPlugin = _webpack2.default.NamedModulesPlugin,
    HotModuleReplacementPlugin = _webpack2.default.HotModuleReplacementPlugin,
    NoEmitOnErrorsPlugin = _webpack2.default.NoEmitOnErrorsPlugin,
    ProgressPlugin = _webpack2.default.ProgressPlugin;
var CommonsChunkPlugin = optimize.CommonsChunkPlugin,
    UglifyJsPlugin = optimize.UglifyJsPlugin;
exports.webpack = _webpack2.default;
exports.DefinePlugin = DefinePlugin;
exports.ProgressPlugin = ProgressPlugin;
exports.UglifyJsPlugin = UglifyJsPlugin;
exports.CommonsChunkPlugin = CommonsChunkPlugin;
exports.LoaderOptionsPlugin = LoaderOptionsPlugin;
exports.NoEmitOnErrorsPlugin = NoEmitOnErrorsPlugin;
exports.NamedModulesPlugin = NamedModulesPlugin;
exports.HotModuleReplacementPlugin = HotModuleReplacementPlugin;
exports.ExtractTextPlugin = _extractTextWebpackPlugin2.default;
exports.HtmlWebpackPlugin = _htmlWebpackPlugin2.default;
exports.CaseSensitivePathsPlugin = _caseSensitivePathsWebpackPlugin2.default;
exports.FriendlyErrorsWebpackPlugin = _friendlyErrorsWebpackPlugin2.default;
exports.mapJSONWebpackPlugin = _mapJsonWebpackPlugin2.default;