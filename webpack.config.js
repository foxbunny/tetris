var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    entry: path.resolve(__dirname, 'src', 'index.js'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index-[hash:20].js'
    },
    module: {
        rules: [
            {
                test: /\.mp3$/,
                use: 'file-loader'
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Tetris',
        }),
        new CleanWebpackPlugin([path.resolve(__dirname, 'dist')]),
        new webpack.HotModuleReplacementPlugin()
    ],
    mode: 'development',
    devServer: {
        hot: true,
        hotOnly: true,
        overlay: true
    }
};
