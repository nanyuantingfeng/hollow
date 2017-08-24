/**************************************************
 * Created by nanyuantingfeng on 11/06/2017 04:26.
 **************************************************/
import CaseSensitivePathsPlugin from 'case-sensitive-paths-webpack-plugin'
import FriendlyErrorsWebpackPlugin from 'friendly-errors-webpack-plugin'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import webpack from 'webpack'
import mapJSONWebpackPlugin from 'map-json-webpack-plugin'

const {
  optimize,
  LoaderOptionsPlugin,
  DefinePlugin,
  NamedModulesPlugin,
  HotModuleReplacementPlugin,
  NoEmitOnErrorsPlugin,
  ProgressPlugin,
  WebpackOptionsValidationError,
  BannerPlugin,
} = webpack

const {CommonsChunkPlugin, UglifyJsPlugin} = optimize

export {
  webpack,
  DefinePlugin,
  ProgressPlugin,
  UglifyJsPlugin,
  CommonsChunkPlugin,
  LoaderOptionsPlugin,
  NoEmitOnErrorsPlugin,
  NamedModulesPlugin,
  HotModuleReplacementPlugin,
  ExtractTextPlugin,
  HtmlWebpackPlugin,
  CaseSensitivePathsPlugin,
  FriendlyErrorsWebpackPlugin,
  mapJSONWebpackPlugin,
  BannerPlugin,
  WebpackOptionsValidationError
}
