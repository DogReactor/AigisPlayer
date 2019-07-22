module.exports = {
  mode: 'development',
  entry: __dirname + '/src/assets/js/inject.js',
  output: {
    path: __dirname + '/dist/app/assets/js',
    filename: 'inject.js',
    libraryTarget: 'commonjs'
  },
  module: {
    rules: [
      {
        test: /\.js[x]?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  node: {
    fs: 'empty'
  }
};
