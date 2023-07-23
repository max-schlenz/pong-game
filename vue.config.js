const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  publicPath: process.env.NODE_ENV === 'production'
    ? '/<REPO>/'
    : '/',
  configureWebpack: {
      entry: "./src/main.js",
      devServer: {
          hot: true,
      },
      watch: true,
      watchOptions: {
          ignored: /node_modules/,
          poll: 500,
      },
  },
  transpileDependencies: true,
});
