var commonConfig = require('./webpack.common.js');
var webpack = require('webpack');
var webpackMerge = require('webpack-merge');

module.exports = webpackMerge(commonConfig, {
    devServer: {
        //https://github.com/webpack/webpack-dev-server/issues/345
        //host: '0.0.0.0', //put the real ip address
        //disableHostCheck: false,
    }
});
