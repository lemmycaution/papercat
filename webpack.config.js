var path = require('path')

module.exports = {
  cache: true,
  context: path.join(__dirname, 'webpack', 'javascripts'),
  entry: './index',
  output: {
    path: path.join(__dirname, 'app', 'assets', 'javascripts', 'papercat'),
    filename: 'application.js'
  },
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        // query: {
        //   presets: ['es2015']
        // }
      }
    ]
  },
}