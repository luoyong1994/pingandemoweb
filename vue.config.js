// vue.config.js
module.exports = {
  devServer: { //代理
    open: true, //配置自动启动浏览器
    host: 'localhost',
    port: 8088, // 端口号
    https: false,
    hotOnly: false,
    proxy: {
      '/data': {
        target: 'http://localhost:8090/',
        changeOrigin: true,
        pathRewrite: {}
      }
    }
  }
}