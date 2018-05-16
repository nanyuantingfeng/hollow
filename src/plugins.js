/**************************************************
 * Created by nanyuantingfeng on 11/06/2017 04:26.
 **************************************************/
import webpack from 'webpack'
import FriendlyErrorsWebpackPlugin from 'friendly-errors-webpack-plugin'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import HTMLWebpackPlugin from 'html-webpack-plugin'
import CopyWebpackPlugin from 'copy-webpack-plugin'
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin'

const {
        DefinePlugin,
        HotModuleReplacementPlugin,
        ProgressPlugin,
        WebpackOptionsValidationError,
        ProvidePlugin,
        DllPlugin,
        DllReferencePlugin,
        HashedModuleIdsPlugin,
      } = webpack

export {
  webpack,
  DefinePlugin,
  ProgressPlugin,
  ProvidePlugin,
  HotModuleReplacementPlugin,
  ExtractTextPlugin,
  HTMLWebpackPlugin,
  FriendlyErrorsWebpackPlugin,
  CopyWebpackPlugin,
  DllPlugin,
  DllReferencePlugin,
  HashedModuleIdsPlugin,
  WebpackOptionsValidationError,
  ForkTsCheckerWebpackPlugin,
}
