'use strict'
let path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const extractSass = new ExtractTextPlugin({
  filename: 'src/public/css/app.css',
  disable: process.env.NODE_ENV === 'development'
})

module.exports = {
  entry: './src/public/js/index.js',
  output: {
    filename: 'app.min.js',
    path: path.resolve(__dirname, 'src/public/build/'),
    publicPath: 'src/public/build/'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [
          // path.resolve(__dirname, 'node_modules')
        ],
        include: [
          path.resolve(__dirname, 'src/public/js')
        ],
        loader: 'babel-loader'
      },
      {
        test: /\.scss$/,
        include: [
          path.resolve(__dirname, 'src/public/scss')
        ],
        use: extractSass.extract({
          use: [{
            loader: 'css-loader'
          }, {
            loader: 'sass-loader'
          }],
          // use style-loader in development
          fallback: 'style-loader'
        })
      }
    ]
  },
  plugins: [
    extractSass
  ]
}
