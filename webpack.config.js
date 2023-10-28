const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')

module.exports = {
    mode:'development',
    entry:{
        bundle:path.resolve(__dirname,'src/index.js')
    },
    output:{
        filename:"[name].[contenthash].js",
        clean:true,
        assetModuleFilename:'[name][ext]'
    },
    devtool:'source-map',
    devServer:{
        static:{
            directory:path.resolve(__dirname,"dist")
        },
        port:3000,
        open:true,
        hot:true,
        compress:true,
        historyApiFallback:true
    },
    module:{
        rules:[
            {
                test:/\.js$/,
                exclude:/node_modules/,
                use:{
                    loader:'babel-loader',
                    options:{
                        presets:['@babel/preset-env']
                    }
                }
            },
            {
                test:/\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            title:'Pixi App',
            filename:'index.html',
            template:'index.html'
        }),
        new CopyPlugin({
            patterns:[
                {from:"public", to:""}
            ]
        })
    ]
}