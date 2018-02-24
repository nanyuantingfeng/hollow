/**************************************************
 * Created by nanyuantingfeng on 11/06/2017 04:26.
 **************************************************/
import webpack from 'webpack'
import FriendlyErrorsWebpackPlugin from 'friendly-errors-webpack-plugin'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import HTMLWebpackPlugin from 'html-webpack-plugin'
import CopyWebpackPlugin from 'copy-webpack-plugin'

const {
        optimize,
        LoaderOptionsPlugin,
        DefinePlugin,
        NamedModulesPlugin,
        HotModuleReplacementPlugin,
        NoEmitOnErrorsPlugin,
        ProgressPlugin,
        WebpackOptionsValidationError,
        ContextReplacementPlugin,
        BannerPlugin,
        ProvidePlugin,
        DllPlugin,
        DllReferencePlugin,
        HashedModuleIdsPlugin,
      } = webpack

const { CommonsChunkPlugin, UglifyJsPlugin, ModuleConcatenationPlugin } = optimize

export {
  webpack,
  DefinePlugin,
  ProgressPlugin,
  ProvidePlugin,
  UglifyJsPlugin,
  CommonsChunkPlugin,
  LoaderOptionsPlugin,
  NoEmitOnErrorsPlugin,
  NamedModulesPlugin,
  HotModuleReplacementPlugin,
  ContextReplacementPlugin,
  ExtractTextPlugin,
  HTMLWebpackPlugin,
  FriendlyErrorsWebpackPlugin,
  BannerPlugin,
  CopyWebpackPlugin,
  DllPlugin,
  DllReferencePlugin,
  HashedModuleIdsPlugin,
  WebpackOptionsValidationError,
  ModuleConcatenationPlugin,
}
