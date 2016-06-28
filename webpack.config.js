/**
 * Created by ravi.hamsa on 6/22/16.
 */

var path = require('path');
var webpack = require('webpack');
var nodeModulesPath = path.resolve(__dirname, 'node_modules');
var buildPath = path.resolve(__dirname, 'public', 'dist');
var mainPath = path.resolve(__dirname, 'app', 'main.js');
const DEBUG = process.env.NODE_ENV !== 'production';

const AUTOPREFIXER_BROWSERS = [
    'Android 2.3',
    'Android >= 4',
    'Chrome >= 35',
    'Firefox >= 31',
    'Explorer >= 9',
    'iOS >= 7',
    'Opera >= 12',
    'Safari >= 7.1',
];

var config = {

    entry: ['./src/main.js'],

    devtool: DEBUG ? 'cheap-module-eval-source-map' : false,

    output: {

        // We need to give Webpack a path. It does not actually need it,
        // because files are kept in memory in webpack-dev-server, but an
        // error will occur if nothing is specified. We use the buildPath
        // as that points to where the files will eventually be bundled
        // in production
        path: buildPath,
        filename: 'bundle.js',

        // Everything related to Webpack should go through a build path,
        // localhost:3000/build. That makes proxying easier to handle
        publicPath: '/build/'
    },

    externals: {
        // Use external version of React
        "react": "React",
        "react-dom": "ReactDOM",
        "moment":"moment"
    },

    module: {

        loaders: [

            // I highly recommend using the babel-loader as it gives you
            // ES6/7 syntax and JSX transpiling out of the box
            {
                test: /\.js$/,
                loaders: ['babel'],
                exclude: [nodeModulesPath]
            },
            {
                test: /\.scss$/,
                loaders: [
                    'isomorphic-style-loader',
                    `css-loader?${JSON.stringify({
                        sourceMap: DEBUG,

                        // CSS Modules https://github.com/css-modules/css-modules
                        modules: true,
                        localIdentName: DEBUG ? '[name]_[local]_[hash:base64:3]' : '[hash:base64:4]',

                        // CSS Nano http://cssnano.co/options/
                        minimize: !DEBUG,
                    })}`,
                    'postcss-loader?parser=postcss-scss',
                ],
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg|woff|woff2)$/,
                loader: 'url-loader',
                query: {
                    name: DEBUG ? '[path][name].[ext]?[hash]' : '[hash].[ext]',
                    limit: 10000,
                },
            },

        ]
    },

    postcss(bundler) {
        return [
            require('postcss-import')({addDependencyTo: bundler}),
            require('precss')(),
            require('autoprefixer')({browsers: AUTOPREFIXER_BROWSERS}),
        ];
    },

    plugins: DEBUG ? [] : [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                screw_ie8: true, // jscs:ignore requireCamelCaseOrUpperCaseIdentifiers
                warnings: false,
            },
        })]
}

module.exports = config;