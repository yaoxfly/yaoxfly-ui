const path = require('path')
const merge = require('webpack-merge')
const webpackBaseConfig = require('./webpack.base.js')
const components = require('../components.json')
// 分离css代码
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const chalk = require('chalk')
const log = (message) => console.log(chalk.green(`${message}`))
log('正在打包组件')
module.exports = merge(webpackBaseConfig, {
    entry: components,
    output: {
        path: path.resolve(__dirname, '../lib'),
        filename: '[name]/index.js',
        libraryTarget: 'commonjs2'
    },
    module: {
        rules: [
            {
                test: /\.(sa|sc|c)ss$/,
                //'vue-style-loader'
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
            },
        ]
    },

    resolve: {
        alias: {
            'eve-ui': path.resolve(__dirname, '../'),
        }
    },

    plugins: [
        new MiniCssExtractPlugin({
            filename: 'theme-chalk/[name].css', // 分离后的文件名
            chunkFilename: '[id].css', //
            ignoreOrder: false
        })
    ]
})

