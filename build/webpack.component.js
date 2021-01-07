const path = require('path')
const merge = require('webpack-merge')
const webpackBaseConfig = require('./webpack.base.js')
const components = require('../components.json')
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
                test: /\.scss$/,
                use: ['vue-style-loader', 'css-loader', 'sass-loader']
            }
        ]
    }
})

