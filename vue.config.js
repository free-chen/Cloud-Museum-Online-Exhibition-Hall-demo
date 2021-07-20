const path = require('path');

module.exports = {
  publicPath: "./",
  outputDir: "dist",
  assetsDir: "static",
  lintOnSave: false,
  productionSourceMap: false,
  devServer: {
    open: false,
    overlay: {
      warnings: false,
      errors: true,
    },
    proxy: {
      ["/api"]: {
        target: `http://172.16.10.37:20013`,
        changeOrigin: true,
        pathRewrite: {
          ['^/api']: ''
        }
      },
      ["/panoDatas"]: {
        target: `http://172.16.10.248:8903/panoDatas`,
        changeOrigin: true,
        pathRewrite: {
          ['^/panoDatas']: ''
        }
      },
    },
  },
  configureWebpack: {
    resolve: {
      alias: {
        "@": path.join(__dirname, "src"),
      },
    },
    performance: {
      hints: false,
    },
    externals: ["jquery"],
  },
};
