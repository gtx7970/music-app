const path = require('path')

module.exports = {
  lintOnSave: false,
  chainWebpack: config => {
    const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
    types.forEach(type => addStyleResource(config.module.rule('less').oneOf(type)))
  }
}

function addStyleResource (rule) {
  rule.use('style-resource')
    .loader('style-resources-loader')
    .options({
      patterns: [
        path.resolve(__dirname, './src/assets/style/var.less'),
        path.resolve(__dirname, './src/assets/style/mixin.less')
      ]
    })
}
