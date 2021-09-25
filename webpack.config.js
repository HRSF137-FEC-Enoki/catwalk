const path = require('path');
const CompressionPlugin = require('compression-webpack-plugin');
const WebpackBundleAnalyzer = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  mode: 'production',
  entry: './client/index.jsx',
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'public'),
    chunkFilename: '[id][chunkhash].js',
  },
  plugins: [
    new CompressionPlugin({
      test: /\.(js(\?.*)?|scss|html|svg)$/i,
    }),
    new WebpackBundleAnalyzer(),
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        options: { presets: ['@babel/env'] },
      },
      {
        test: /\.(s[ac]ss)$/i,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
  resolve: { extensions: ['*', '.js', '.jsx'] },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'all',
        },
      },
    },
  },
};
