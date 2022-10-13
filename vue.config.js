const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({publicPath: process.env.NODE_ENV === 'production'
      ? '/pudding/'
      : '/',
  outputDir: 'docs',
  transpileDependencies: [
    'vuetify'
  ]
})
