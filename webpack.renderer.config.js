const webpack = require('webpack');
const merge = require('webpack-merge');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const InterpolateHtmlPlugin = require('interpolate-html-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const path = require('path')
const baseConfig = require('./webpack.base.config');

module.exports = merge.smart(baseConfig, {
    target: 'electron-renderer',
    entry: {
        app: ['@babel/polyfill','./src/renderer/app.tsx']
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    cacheDirectory: true,
                    babelrc: false,
                    presets: [
                        [
                            '@babel/preset-env',
                            { targets: { browsers: 'last 2 versions ' } }
                        ],
                    ],
                    plugins: [
                        ['@babel/plugin-proposal-class-properties', { loose: true }]
                    ]
                }
            },
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    cacheDirectory: true,
                    babelrc: false,
                    presets: [
                        [
                            '@babel/preset-env',
                            { targets: { browsers: 'last 2 versions ' } }
                        ],
                        '@babel/preset-typescript',
                        '@babel/preset-react'
                    ],
                    plugins: [
                        ['@babel/plugin-proposal-class-properties', { loose: true }]
                    ]
                }
            },
            {
                test: /\.scss$/,
                loaders: [
                    //'style-loader',
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    'css-loader?modules&camelCase&localIdentName=[path][name]-[local]-[hash:5]',
                    'sass-loader'
                ]
            },
            {
                // antd全局样式非模块化
                test: /\.css$/,
                loaders: [
                    //'style-loader',
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    'css-loader'
                ]
            },
            {
                test: /\.(gif|png|jpe?g|svg)$/,
                use: [
                    {
                        loader: 'svg-url-loader',
                        options: {
                            encoding: 'base64'
                        }
                    }
                ]
            },
            {
                test: /\.(ttf|eot|woff|woff2)$/,
                use: 'file-loader'
            }
            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            // {
            //     enforce: 'pre',
            //     test: /\.js$/,
            //     loader: 'source-map-loader'
            // }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].css'
        }),
        new ForkTsCheckerWebpackPlugin({
            reportFiles: ['src/renderer/**/*']
        }),
        new webpack.NamedModulesPlugin(),
        new CopyWebpackPlugin([{
            from: __dirname + '/public',
            to: __dirname + '/dist',
            ignore: 'index.html'
        }]),
        new HtmlWebpackPlugin({
            template: __dirname + '/public/index.html'
        }),
        new InterpolateHtmlPlugin({
            PUBLIC_URL: '.' // can modify `static` to another name or get it from `process`
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
        })
    ],
    resolve: {
        // 设置别名
        alias: {
            '@': path.resolve(__dirname, './src/renderer'),
        }
    }
});
