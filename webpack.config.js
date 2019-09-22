let path = require('path');

let config = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, './dist/js'),
    filename: 'common.min.js',
    publicPath: 'dist/js/'
  },
  devServer: {
    overlay: true
  }
};

module.exports = config;
