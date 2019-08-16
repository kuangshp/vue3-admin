const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// 自定义webpack
module.exports = {
  configureWebpack: (config) => {
    const env = process.env.NODE_ENV;
    switch (env) {
      case 'development':
        console.log('当前为development环境');
        break;
      case 'production':
        console.log('当前为production环境');
        break;
      case 'uat':
        console.log('当前为uat环境');
        break;
      case 'fat':
        console.log('当前为fat环境');
        break;
      default:
        console.error('当前为环境未配置');
        break;
    }
    // 配置插件start
    let plugins = [
      new HtmlWebpackPlugin({
        template: './src/index.html',
        title: 'admin-web',
        hash: true,
        minify: {
          removeAttributeQuotes: false, // 去除双引号(实际开发改为true)
          collapseWhitespace: false, // 合并代码到一行(实际开发改为true)
        },
      }),
    ];
    config.plugins = [...config.plugins, ...plugins];
    // 配置插件end
  },
  chainWebpack: (config) => {
    // 配置别名
    config.extensions = ['.js', '.ts', '.vue'];
    config.resolve.alias
      .set('views', path.resolve(__dirname, 'src/views'))
      .set('api', path.resolve(__dirname, 'src/api'))
      .set('utils', path.resolve(__dirname, 'src/utils'));
  },
  // 配置开发服务器
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    port: 8000,
    compress: true, // 自动压缩
    open: true, // 自动打开浏览器
  },
};
