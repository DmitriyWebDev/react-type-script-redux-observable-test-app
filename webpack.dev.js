const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BabelPluginTransformImports = require('babel-plugin-transform-imports');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const webpack = require('webpack');
const path = require('path');
const APP_DIR = path.join(__dirname, 'app');
const BUILD_DIR = path.join(__dirname, 'public/static');

const host = process.env.HOST || 'http://localhost:8088';

module.exports = {
  entry: [APP_DIR + '/Index.tsx'],
  output: {
    path: BUILD_DIR,
    filename: 'js/bundle.[hash].js',
    publicPath: '/',
  },

  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
          },
        },
      },
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: [
          { loader: 'cache-loader' },
          {
            loader: 'thread-loader',
            options: {
              // there should be 1 cpu for the fork-ts-checker-webpack-plugin
              workers: require('os').cpus().length - 1,
            },
          },
          {
            loader: 'ts-loader',
            options: {
              happyPackMode: true,
            },
          },
        ],
      },
      {
        test: /\.module.(scss)$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              alias: { '../img': '../public/img' },
              import: true,
              importLoaders: 2,
              localIdentName: '[name]__[local]__[hash:base64]',
              modules: true,
              sourceMap: true,
            },
          },
          {
            loader: 'sass-loader',
          },
        ],
      },
      {
        test: /\.(scss)$/,
        exclude: /\.module.(scss)$/,
        use: [
          {
            loader: 'style-loader',
          },
          'css-hot-loader',
          {
            loader: 'css-loader',
            options: { alias: { '../img': '../public/img' } },
          },
          {
            loader: 'sass-loader',
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.(png|jpg|jpeg|gif|ico)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              esModule: false,
              name: './img/[name].[hash].[ext]',
            },
          },
        ],
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader',
        options: {
          esModule: false,
          name: './fonts/[name].[hash].[ext]',
        },
      },
    ],
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin({
      typescript: {
        diagnosticOptions: {
          semantic: true,
          syntactic: true,
        },
      },
    }),
    new HtmlWebpackPlugin({
      inject: true,
      template: './public/index.html',
    }),
    new CopyWebpackPlugin([{ from: './public/img', to: 'img' }], {
      copyUnmodified: false,
    }),
    new webpack.DefinePlugin({
      FRONTEND_APP_VERSION: JSON.stringify(require('./package.json').version),
      NODE_ENV: 'dev',
    }),
  ],
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  mode: 'development',
  devtool: 'eval-cheap-module-source-map',
  devServer: {
    historyApiFallback: true,
    inline: true,
    contentBase: BUILD_DIR,
    port: 4444,
    proxy: [
      {
        context: [''],
        target: host,
        secure: false,
        changeOrigin: true,
      },
    ],
  },
};
