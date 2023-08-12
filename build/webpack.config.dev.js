// 合并规则
const { merge } = require('webpack-merge')

// 导入基础配置
const baseConfig = require('./webpack.config.base.js')

module.exports = merge(baseConfig, {
    mode: 'development',
    devtool: 'source-map',
    // devServer
    devServer: {
        // 启动时打开浏览器
        open: true,
        port: 8000,
        // 热更新
        hot: true,
    },
})
