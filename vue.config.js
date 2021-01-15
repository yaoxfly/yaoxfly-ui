const path = require('path')
function resolve (dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  pages: {
    index: {
      // page 的入口
      entry: 'src/main.js',
      // 模板来源
      template: 'public/index.html',
      // 输出文件名
      filename: 'index.html',
      // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
      title: 'eve-ui',
      cdn: {
        css: [
          //element-ui
          '//unpkg.zhimg.com/element-ui/lib/theme-chalk/index.css',
        ],
        js: [
          // vue
          '//unpkg.zhimg.com/vue@2.6.12/dist/vue.runtime.min.js',
          // vue-router
          '//unpkg.zhimg.com/vue-router@3.4.9/dist/vue-router.min.js',
          // vuex
          '//unpkg.zhimg.com/vuex@3.5.1/dist/vuex.min.js',
          //element-ui
          '//unpkg.zhimg.com/element-ui@2.13.2/lib/index.js',
        ]
      }
    }
  },
  productionSourceMap: false,
  parallel: false,
  publicPath: process.env.NODE_ENV === 'production' ? '/eve-ui/' : '/',
  chainWebpack: config => {
    config.module.rule('md')
      .test(/\.md/)
      .use('vue-loader')
      .loader('vue-loader')
      .end()
      .use('vue-markdown-loader')
      .loader('vue-markdown-loader/lib/markdown-compiler')
      .options({
        raw: true
      })
    config.resolve.alias.set('eve-ui', resolve('./'))
  },

  css: {
    // 是否使用css分离插件 ExtractTextPlugin 采用独立样式文件载入，不采用<style>方式内联至html文件中
    extract: true,
    // 是否在构建css样式映射，false将提高构建速度
    sourceMap: false,
  },

  configureWebpack: config => {
    //cdn 配置
    config.externals = {
      vuex: 'Vuex',
      'vue-router': 'VueRouter',
      'element-ui': 'ELEMENT'
    }
  }
}