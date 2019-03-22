const path = require('path')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
    entry: './src/index.js',
    plugins: [
        new UglifyJSPlugin({
            sourceMap: true
        })
    ],
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env']
                    }
                }
            }
        ]
    },
    output: {
        filename: 'vue-form-maker.js',
        path: path.resolve(__dirname, 'dist'),
        library: 'VueFormMaker',
        libraryTarget: 'umd'
    }
}