module.exports = {
    entry: './src/main.js',
    output: {
        path: './public/',
        filename: 'app.js'
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: 'style!css' },
            { test: /\.less$/, loader: 'style!css!less' },
            { test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=\.]+)?$/, loader: 'file-loader' }
        ]
    }
};