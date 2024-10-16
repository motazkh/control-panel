const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: {
    'app': './src/index.js',
    'assets/js/banner' : './src/assets/js/banner.js'
  },
  output: {
    path: path.join(__dirname, '/app'),
    filename: '[name].js',
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
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader, 
          'css-loader', 
          'postcss-loader',
          'sass-loader'
        ]
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
      chunks: ['app']
    }),
    new HtmlWebpackPlugin({

        filename: "components/button.html",
  
        template: "./src/components/button.html",
        chunks: ['app']
      }),
      new HtmlWebpackPlugin({

        filename: "components/textfield.html",
  
        template: "./src/components/textfield.html",
        chunks: ['app']
      }),
      new HtmlWebpackPlugin({

        filename: "components/card.html",
  
        template: "./src/components/card.html",
        chunks: ['app']
      }),
      new HtmlWebpackPlugin({

        filename: "components/banner.html",
  
        template: "./src/components/banner.html",
        chunks: ['app' , 'assets/js/banner']
      }),
  ],
};
