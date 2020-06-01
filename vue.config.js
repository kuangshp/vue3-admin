const path = require("path");

module.exports = {
  configureWebpack: {
    resolve: {
      // 配置别名
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
    },
  },
  devServer: {
    port: 9000,
    open: false,
    disableHostCheck: true,
  },
}