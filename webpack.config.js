var webpack = require("webpack");

module.exports = {
    entry: "./client/Main.js",
    output: {
        path: "./public/js",
        publicPath: "js/",
        filename: "bundle.js"
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: [/node_modules/, /public/],
                loader: "babel",
                query: {
                    presets:['es2015','react']
                }
            }
        ]
    },
    plugins: [
        //new webpack.optimize.UglifyJsPlugin({minimize: true})
    ]
};