const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');


module.exports = (env, argv) => ({
  mode: 'development',
  optimization: {
    minimizer: [new TerserPlugin({ /* additional options here */ })],
  },
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "public"),
    filename: 'js/bundle.js'
    //publicPath: '/assets/'
  },
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    //compress: true,
    port: 8080,
    //writeToDisk: true, //only for ebugging
    historyApiFallback: true // needed for router
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
      },
      {
        test: /\.(png|svg|jpg|gif|jpeg)$/,
        use: [
          'file-loader'
        ]
      }
    ]
  },
  resolve: {
    alias: {
      // common: path.resolve(__dirname, 'src/common/'),
      // components: path.resolve(__dirname, 'src/components/'),
      // config: path.resolve(__dirname, 'src/config/'),
      // images: path.resolve(__dirname, 'src/images/'),
      // layout: path.resolve(__dirname, 'src/layout/'),
      // stylesheets: path.resolve(__dirname, 'src/stylesheets/')

      _src: path.resolve(__dirname, 'src/'),
    }
  },
  //, devtool: 'source-map' //only for ebugging
})