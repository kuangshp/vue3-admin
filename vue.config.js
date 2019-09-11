const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const pjson = require('./package.json');

const isProduction = Object.is(process.env.NODE_DEV, 'production');
// const isUat = Object.is(process.env.NODE_DEV, 'uat');
// const isFat = Object.is(process.env.NODE_DEV, 'fat');

// 路径引入的方法
const resolve = (dir) => {
  return path.resolve(__dirname, dir);
}

// 自定义webpack
module.exports = {
  // 基本的路径 baseUrl
  publicPath: './',
  // 打包输出的路径
  outputDir: path.join(__dirname, './dist', pjson.name),
  /********************************css的配置 start********************************/
  css: {
    // 分离插件
    extract: true,
    // 开发人员定位问题
    sourceMap: false,
    loaderOptions: {
      // 配置引入全局的样式
      less: {
        data: `@import "@/assets/common/css/index.less";`
      }
    },
    modules: false,
  },
  /********************************css的配置 end********************************/

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
        favicon: './src/images/favicon.png',
        href: path.join('/', pjson.name, '/'),
        minify: {
          removeAttributeQuotes: false, // 去除双引号(实际开发改为true)
          collapseWhitespace: false, // 合并代码到一行(实际开发改为true)
        },
      }),
    ];
    config.plugins = [...config.plugins, ...plugins];
    // 配置插件end
    if (isProduction) {
      config.plugins.push(
        new UglifyJsPlugin({
          uglifyOptions: {
            compress: {
              drop_debugger: true,
              drop_console: true,
            }
          },
          sourceMap: false,
          // 开启进程构建项目
          parallel: true,
        })
      )
    }
  },
  chainWebpack: (config) => {
    // 配置别名
    config.extensions = ['.js', '.ts', '.vue'];
    config.resolve.alias
      .set('views', resolve('src/views'))
      .set('api', resolve('src/api'))
      .set('utils', resolve('src/utils'));
    // 判断在生产环境做的事情
    if (isProduction) {
      // 删除预加载
      config.plugins.delete('preload');
      config.plugins.delete('prefetch');
      // 压缩代码
      config.optimization.minisize(true);
      // 分割代码
      config.optimization.splitChunks({
        chunks: 'all'
      })
    }
  },
  // 生产环境是否生成soureceMap
  productionSourceMap: false,
  // 启动并发数
  parallel: require('os').cpus().length > 1,
  // 配置开发服务器
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    port: 8000,
    compress: true, // 自动压缩
    open: true, // 自动打开浏览器
    inline: true, // 页面自动刷新
    hot: true, //热更新,实时更新
  },
};
