const path = require("path");
const theme = path.resolve(__dirname, "src/common/theme.less");
module.exports = {
  pwa: {
    iconPaths: {
      favicon32: 'favicon.ico',
      favicon16: 'favicon.ico',
      appleTouchIcon: 'favicon.ico',
      maskIcon: 'favicon.ico',
      msTileImage: 'favicon.ico'
    }
  },
  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          hack: `true; @import "${theme}";`
        }
      }
    }
  },
  // 命令行 spy-debugger//真机模拟
  devServer: {
    open: true,
    // host: 'localhost',
    host: '192.168.9.107',
    port: 8081,
    https: false,
    proxy: {
      '/api': {
        // target: 'http://192.168.1.86/wp/20200421/api.php/Main',//测试地址
        target: 'http://crm.zjzhilianyun.com/api.php/Main',//线上地址
        ws: true,
        changOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }

    }
  }




}