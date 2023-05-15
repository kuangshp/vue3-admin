const path = require("path");
const menus = require('./menu-data');

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
    before(app) {
      app.get('/api/category', (req, res) => {
        res.json({
          code: 0,
          data: menus,
        })
      })
    }
  },
}