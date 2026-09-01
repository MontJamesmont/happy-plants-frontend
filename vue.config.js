const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  runtimeCompiler: true,
  devServer: {
    proxy: {
      '^/': {
        target: 'http://localhost:8082/',
        ws: true,
        changeOrigin: true,
        logLevel: 'debug'
      }
    }
  }
})
