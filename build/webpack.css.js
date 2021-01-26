const path = require('path')
const merge = require('webpack-merge')
const webpackBaseConfig = require('./webpack.base.js')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const editPackage = require('./node.edit.package.js')
const chalk = require('chalk')
const log = (message) => console.log(chalk.green(`${message}`))
log('正在打包base.css')
module.exports = merge(webpackBaseConfig, {
    entry: './src/assets/style/base.scss',
    output: {
        path: path.resolve(__dirname, '../lib'),
    },
    module: {
        rules: [
            {
                test: /\.(sa|sc|c)ss$/,
                //'  vue-style-loader'
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
            },
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'theme-chalk/base.css', // 分离后的文件名
            chunkFilename: '[id].css',
            ignoreOrder: false
        })
    ]
})
log('正在更新package.json')
editPackage.writePackageJson()


