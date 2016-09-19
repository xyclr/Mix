/**
 * Created by pomy on 15/11/4.
 */

var path = require('path');
var webpack = require('webpack');
//var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js');

module.exports = {
    entry: {
        index: path.resolve(__dirname, './src/js/index.js'),
        partner: path.resolve(__dirname, './src/js/partner.js')
        },
    output: {
        path: path.resolve(__dirname, './assets/js'),
        publicPath: path.resolve(__dirname, './assets/js'),
        filename: '[name].js'
    },

    module: {
        loaders: [
            { test: /\.js?$/, loaders: ['babel'], exclude: /node_modules/ },
            { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/},
            {test: /\.css$/, loader: "style-loader!css-loader", exclude: /node_modules/},
            //{test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader")},
            {test: /\.scss$/, loader: "style!css!sass"},
            {test: /\.less/,loader: 'style-loader!css-loader!less-loader'},
            {test: /\.(jpg|png)$/, loader: "url-loader?limit=8192&name=/i/[hash:8].[name].[ext]"},
        ]
    },

    resolve:{
        extensions:['','.js','.json','.png']
    },

    //插件项
   // plugins: [commonsPlugin]
};