var path = require('path');
var webpack = require('webpack');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var APP_PATH = path.resolve(__dirname,'app');
var SRC_PATH = path.resolve(__dirname,'src');
module.exports = {
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.js'
        }
    },
  // 这是一个主文件包括其他模块
  entry: './src/ui/js/main.js',
  // 编译的文件路径
  output: {
      //`dist`文件夹
    path: './dist-green/app',
    // 文件 `build.js` 即 dist/build.js
    filename: 'app.js'
  },
  module: {
    // 一些特定的编译规则
    loaders: [
      {
        // 让webpack去验证文件是否是.js结尾将其转换
        test: /\.js$/,
        // 通过babel转换
        loader: 'babel',
        exclude:[/node_modules/,/static/]
      },
      {
        test: /\.vue$/,
        loader: 'vue'
        }
    ],
    vue:{
        loaders:{
            js: 'babel'
        }
    }
  },
  plugins: [
        new webpack.optimize.DedupePlugin(),
        //new webpack.optimize.UglifyJsPlugin({comments: false}),
        new CopyWebpackPlugin([
            { from: path.resolve(SRC_PATH, 'main.js'), to: 'main.js' },
            //{ from: path.resolve(SRC_PATH, 'backend'), to: 'backend' },
            //{ from: path.resolve(SRC_PATH, 'node_modules'), to: 'node_modules' },
            { from: path.resolve(SRC_PATH, 'ui/static'), to: 'static' },
            { from: path.resolve(SRC_PATH, 'ui/index.html'), to: 'index.html'},
            { from: path.resolve(SRC_PATH, 'package.json'), to: 'package.json'}
        ])
  ]
}