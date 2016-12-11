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
      //目标文件夹
    path: './app',
    // 文件 `app.js` 即 app/app.js
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
  }
}