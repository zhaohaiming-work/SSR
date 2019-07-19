const withSCSS = require('@zeit/next-sass');
const withCSS = require('@zeit/next-css');
const withImages = require('next-images');
const path = require('path')
const extensions = ['*', '.web.tsx', '.web.ts', '.web.js', '.js', '.jsx', '.json', '.scss', '.jpg', '.png']
module.exports = withSCSS(withImages(withCSS({
  webpack: (config) => {
    const aliasObj = {
      style: path.resolve(__dirname, 'style'),
      src: path.resolve(__dirname, 'src'),
      routes: path.resolve(__dirname, 'routes')
    }
    Object.entries(aliasObj).forEach(v => {
      config.resolve.alias[v[0]] = v[1]
    })
    config.resolve.extensions = extensions
    config.module.rules.push({
      test: /\.(eot|woff|woff2|ttf|svg)$/,
      use: {
        loader: 'file-loader',
        options: {
          limit: 100000,
          name: '[name].[hash].[ext]',
        },
      },
    });
    return config;
  }
})))