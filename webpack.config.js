const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'development',

  entry: {
    main: './src/index.js'},

  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    clean:true
  },

  devtool: 'inline-source-map',
  devServer:{
    static: './dist',
    client:{
      logging: 'warn',
      overlay: {
        errors: false,
        warnings: false,
        runtimeErrors: false,
      }
    }
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: 'Output Management',
      template: './src/index.html'
    }),

    new MiniCssExtractPlugin({
      filename: 'styles.css', // Output CSS filename
    }),
  ],

  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader,  'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'image/[name][ext]' // Output image filename with image/ prefix
        }
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resources',
      },
      {
        test: /\.(csv|tsv)$/i,
        use: ['csv-loader'],
      },
      {
        test: /\.xml$/i,
        use: ['xml-loader'],
      },
    ],
  },


};