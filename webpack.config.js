const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const pug = require('./webpack/pug');
const devserver = require('./webpack/devserver');
const sass = require('./webpack/sass');
const images = require('./webpack/images');

const PATHS = {
  source: path.join(__dirname, 'source'),
  build: path.join(__dirname, 'build')
};

const common = merge([
  {
    entry: PATHS.source + "/pages/index/index.js",
    output: {
      filename: "[name].js",
      path: PATHS.build
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: PATHS.source + "/pages/index/index.pug"
      })
    ]
  },
  pug(),
  images()
]);

module.exports = function (env) {
  if (env === "production") {
    return common
  }
  if (env === "development") {
    return merge([
      common,
      devserver(),
      sass()
    ])
  }
};