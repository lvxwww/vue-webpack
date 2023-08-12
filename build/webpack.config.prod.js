const path = require('path')
const { merge } = require('webpack-merge')

// 压缩css
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
// CSS单独文件
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// 压缩js
const TerserPlugin = require('terser-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')

// 导入基础配置
const baseConfig = require('./webpack.config.base.js')

module.exports = merge(baseConfig, {
    mode: 'production',
    plugins: [
        // 复制文件插件
        new CopyPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, '../public'), // 复制public下文件
                    to: path.resolve(__dirname, '../dist'), // 复制到dist目录中
                    filter: (source) => {
                        return !source.includes('index.html') // 忽略index.html
                    },
                },
            ],
        }),
        // 提取css为单独文件
        new MiniCssExtractPlugin({
            filename: `static/css/[name].[contenthash:8].css`,
        }),
    ],
    optimization: {
        minimizer: [
            new CssMinimizerPlugin(),
            new TerserPlugin({
                // 压缩js
                parallel: true, // 开启多线程压缩
                terserOptions: {
                    compress: {
                        pure_funcs: ['console.log'], // 删除console.log
                    },
                },
            }),
        ],
        splitChunks: {
            // 分隔代码
            cacheGroups: {
                vendors: {
                    // 提取node_modules代码
                    test: /node_modules/, // 只匹配node_modules里面的模块
                    name: 'vendors', // 提取文件命名为vendors,js后缀和chunkhash会自动加
                    minChunks: 1, // 只要使用一次就提取出来
                    chunks: 'initial', // 只提取初始化就能获取到的模块,不管异步的
                    minSize: 0, // 提取代码体积大于0就提取出来
                    priority: 1, // 提取优先级为1
                },
                commons: {
                    // 提取页面公共代码
                    name: 'commons', // 提取文件命名为commons
                    minChunks: 2, // 只要使用两次就提取出来
                    chunks: 'initial', // 只提取初始化就能获取到的模块,不管异步的
                    minSize: 0, // 提取代码体积大于0就提取出来
                },
            },
        },
    },
})
