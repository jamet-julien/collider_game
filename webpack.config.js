var webpack = require('webpack');
var production = process.argv.indexOf("--prod") > -1;
var WebpackBuildNotifierPlugin;

var config = {
    context: __dirname,
    entry: [
        'whatwg-fetch',
        "babel-polyfill",
        "babel-regenerator-runtime",
        
        //"./resources/js/tracking.js",
        "./resources/js/googleAnalytics.js",
        "./resources/js/detectOrientation.js",
        "./resources/js/share.js",
        "./resources/js/game.js",
        
        "./resources/js/controller/Game.js",
        "./resources/js/controller/Api.js",
        "./resources/js/controller/Form.js",
        "./resources/js/controller/Router.js"

    ],
    output: {
        path     : __dirname + '/dist',
        filename : 'main.js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /(node_modules)/,
                include: __dirname
            }
        ]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            comments: false
        })
    ]
};

if (!production) {
    WebpackBuildNotifierPlugin = require ('webpack-build-notifier');
    config.watch = true;
    config.watchOptions = {};
    config.watchOptions.aggregateTimeout = 50;
    config.devtool = 'inline-source-map';
    config.plugins.push(new WebpackBuildNotifierPlugin({
        title: 'Game Sosh',
        successSound: false,
        failureSound: false
    }));
}
module.exports = config;
