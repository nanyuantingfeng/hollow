
export default function customConfig(webpackConfig,environment) {
  if (environment === 'development') {
    webpackConfig.a = 'd';
  } else {
    webpackConfig.a = 'p';
  }

  return webpackConfig;
};
