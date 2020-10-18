const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const commonWebpackConfig = require('../webpack.common');

module.exports = {
  stories: ['../app/**/*.stories.tsx'],
  webpackFinal: config => {
    return {
      ...config,
      module: {
        ...config.module,
        rules: commonWebpackConfig.module.rules,
      },
      plugins: [
        new MiniCssExtractPlugin({
          filename: 'css/[name].[hash].css',
        }),
        new webpack.DefinePlugin({
          FRONTEND_APP_VERSION: JSON.stringify(require('../package.json').version),
        }),
        ...config.plugins,
      ],
    };
  },
  addons: [
    {
      name: '@storybook/preset-typescript',
      options: {
        tsLoaderOptions: {
          configFile: path.resolve(__dirname, '../tsconfig.json'),
        },
        include: [path.resolve(__dirname)],
      },
    },
  ],
};
