/* eslint-disable import/no-unresolved */
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development',
  externals: { // 讓 jQuery 和 Bootstrap 在 end-point（使用者瀏覽器上） 引用，不用包成 vendor.bundle.js
    jquery: 'jQuery',
    bootstrap: true
  },
  entry: {
    // vendor: ['bootstrap/dist/css/bootstrap.min.css', 'bootstrap/dist/js/bootstrap.bundle', 'jquery'],
    main: {
      import: './src/js/app.js'
      // dependOn: 'vendor' // The entry points that the current entry point depends on. They must be loaded before this entry point is loaded.
    }
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'boardPlugin',
    clean: true // to clean the /dist folder before each build
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist'
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  plugins: [ // 由 template 建立一個 index.html 檔案，放到 dist（output） 下
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/index.html'
    })
  ]
}
