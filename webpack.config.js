const path = require('path');

module.exports = {
  context: __dirname,
  mode: "production",
  devtool: 'inline-source-map',  
  entry: "./js/main.js",
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  output: {
    path: path.join(process.cwd(), 'js'),
    publicPath: "/js/",
    filename: "bundle.js",
  },
  devServer: {
    static: {
      directory: path.join(__dirname),
      publicPath: '/',
    },
  },
};
