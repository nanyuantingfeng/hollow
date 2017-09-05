import { join } from 'path';
import pkg from './package.json';

export default async function customConfig(context) {
  let {webpackConfig} = context
  webpackConfig.output.path = join(process.cwd(), 'dist', pkg.name, pkg.version);
  return webpackConfig;
};
