require('babel-polyfill');

var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: ['babel-polyfill', './js/App.js'],
    output: {
        path: __dirname,
        filename: '../riceshare/static/js/bundle.js'
    },

    module: {
        loaders: [
            {
                test: /.jsx?$/,
                loader: 'babel-loader',
                exclude: [/node_modules/, /mobile/],
                query: {
                    presets: ['es2015', 'react']
                }
            }
        ]
    },
};
