const path = require('path')
const merge = require('webpack-merge')
const webpackBaseConfig = require('./webpack.base.js')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
module.exports = merge(webpackBaseConfig, {
    entry: './src/assets/style/bass.scss',
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

