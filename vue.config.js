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
}