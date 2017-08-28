//http://jmfurlott.com/setting-up-react-hot-loader/
//https://webpack.github.io/docs/webpack-dev-server.html
var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var distPath = path.join(__dirname, 'dist');

module.exports = {
    devtool: 'cheap-module-eval-source-map',
    entry: {
        main: [
            'webpack-dev-server/client?http://localhost:3030',
            'webpack/hot/only-dev-server',
            "./src/main.js",
        ]
    },
    output: {
        //The path below must be an absolute path or else there will be an error
        //when you execute npm start saying that webpack is not an executable command
        path: distPath,
        filename: "[name].js",
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new HtmlWebpackPlugin({
          template: 'src/index.html',
          //https://github.com/coryhouse/react-slingshot/issues/128
          favicon: 'src/favicon.ico'
        })
    ],
    devServer: {
        //Inline mode (a small webpack-dev-server client entry is added to the bundle which refreshes the page on change)
        inline: true,

        //Serve the content from the dist folder
        //where webpack puts all compiled js, css, html and other codes together
        contentBase: './dist',

        //https://github.com/webpack/webpack-dev-server/issues/345
        //https://github.com/webpack/webpack-dev-server/issues/147
        host: '0.0.0.0',
        disableHostCheck: true,

        port: 3030
    },
    module: {
        loaders: [

            //Note about this loader
            //https://teamtreehouse.com/community/anyone-else-getting-an-error-when-including-react-hot-loader-in-the-webpack-config
            //Use a file .babelrc
            {
                test: /\.(jsx|js)$/,
                exclude: /node_modules/,
                loaders: ["babel-loader"]
            },

            {
                test: /\.scss$/,
                exclude: /node_modules/,
                loader: 'style-loader!css-loader!sass-loader'
            },

            //http://blog.theodybrothers.com/2015/07/how-to-use-bootstrap-css-only-and.html
            { test: /\.css$/, loader: 'style-loader!css-loader' },
            { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file-loader" },
            { test: /\.ico(\?v=\d+\.\d+\.\d+)?$/, loader: "file-loader" },
            { test: /\.(woff|woff2)$/, loader:"url-loader?prefix=font/&limit=5000" },
            { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url-loader?limit=10000&mimetype=application/octet-stream" },
            { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url-loader?limit=10000&mimetype=image/svg+xml" }
        ]//End of loaders[]
    }//End of module
}
