const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: {
    app: './src/index.js',
  },
  output: {
    path: path.join(__dirname, '/app'),
    filename: 'app.js',
  },
  devServer: {
    static: path.join(__dirname, '/app'),
    port: 8081,
    devMiddleware: {
      writeToDisk: true,
    },
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
          },
        ],
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader',"postcss-loader", 'sass-loader'],
      },
      {

        test: /\.(svg|eot|woff|woff2|ttf)$/,

        exclude: /images/,

        use: [

          {

            loader: "file-loader", 

            options: {

              name: '[name].[ext]',

              outputPath: "assets/fonts",

            }

          }

        ]

      },
    ],
  },
  optimization: {
    minimize: true,
    minimizer: [
      `...`, // هذا سيستخدم تهيئات minimizer الافتراضية
      new CssMinimizerPlugin(),
    ],
  },
  plugins: [
    new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
    new MiniCssExtractPlugin({
      filename: 'assets/css/style.css',
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/index.html',
    }),
  ],
};
