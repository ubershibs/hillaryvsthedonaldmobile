var webpack = require('webpack');
var autoprefixer = require('autoprefixer');

module.exports = {
  devtool: 'eval-source-map',
  context: __dirname,
  entry: [
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
    './src/index.jsx'
  ],
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        'presets': ['es2015', 'stage-2', 'react'],
        'plugins': ['react-hot-loader/babel']
      }
    },  {
        test: /\.css$/,
        loader: 'style!css!postcss'
    }]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  output: {
    path: __dirname + '/dist',
    publicPath: '/',
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: './dist',
    colors: true,
    historyApiFallback: true,
    inline: false,
    port: 8080,
    hot: true
  },
  postcss: function() {
  return [autoprefixer];
},
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ]
};
