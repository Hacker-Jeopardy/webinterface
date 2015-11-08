'use strict';

var webpack = require('webpack');
var path = require('path');
var srcPath = path.join(__dirname, 'src');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: [
        'webpack-dev-server/client?http://localhost:8080',
        'webpack/hot/only-dev-server',
        path.join(srcPath, 'main.js')
    ],
    resolve: {
        root: srcPath,
        extensions: ['', '.js', '.jsx'],
        modulesDirectories: ['node_modules', 'src']
    },
    output: {
        path: path.join(__dirname, 'build'),
        publicPath: '',
        filename: 'app.js',
        pathInfo: true
    },

    module: {
        loaders: [
            { test: /\.jsx$/, loader: 'react-hot!babel', include: srcPath },
            { test: /\.css$/, loader: 'style!css' },
            { test: /\.less$/, loader: 'style!css!less' },
            { test: /\.wav$/, loader: 'file-loader' },
            { test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=\.]+)?$/, loader: 'file-loader' }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({ inject: true, template: 'src/index.html' }),
        new webpack.HotModuleReplacementPlugin(),
        /*new webpack.optimize.UglifyJsPlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.DedupePlugin(),*/
        new webpack.NoErrorsPlugin()
    ],

    debug: true,
    context: srcPath,
    devtool: 'source-map',
    devServer: {
        contentBase: './build',
        hot: true
    }
};