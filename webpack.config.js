const path = require('path');

module.exports = {
  context: __dirname,
  entry: './lib/main.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.bundle.js'
  },
  devtool: 'source-map',
  resolve: {
    extensions: [".js", "*"]
  }
};