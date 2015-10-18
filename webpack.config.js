var webpack = require('webpack');

module.exports = {
    entry: {
        javascript: './src/main.js',
        html: "./src/index.html"
    },
    output: {
        path: './build/',
        filename: 'app.js'
    },
    module: {
        loaders: [
            { test: /\.html$/, loader: 'file-loader?name=[name].[ext]' },
            { test: /\.css$/, loader: 'style!css' },
            { test: /\.less$/, loader: 'style!css!less' },
            { test: /\.mustache$/, loader: 'mustache' },
            { test: /\.wav$/, loader: 'file-loader' },
            { test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=\.]+)?$/, loader: 'file-loader' }
        ]
    },
    plugins: [
        /*new webpack.optimize.UglifyJsPlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.DedupePlugin()*/
    ],
    devServer: {
        contentBase: './build'
    }
};