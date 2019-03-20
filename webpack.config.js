const path 				= require('path');
const webpack			= require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
	entry: './src/app.jsx',
	output: {
		path: path.resolve(__dirname, 'dist'),
		publicPath:'/dist/',
		filename: 'js/app.js'
	},
	module: {
		rules: [
			// react 处理
			{
			  test: /\.m?jsx$/,
			  exclude: /(node_modules)/,
			  use: {
			    loader: 'babel-loader',
			    options: {
			      presets: ['env','react']
			    }
			  }
			},
			// css
			{
	        	test: /\.css$/,
	        	use: ExtractTextPlugin.extract({
	          		fallback: "style-loader",
	          		use: "css-loader"
		        })
	        },
			// sass
	        {
		        test: /\.scss$/,
		        use: ExtractTextPlugin.extract({
		    	    fallback: 'style-loader',
		        	use: ['css-loader', 'sass-loader']
		        })
		    },
		    // 图片
		    {
		        test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                            name: 'resource/[name].[ext]'
                        }
                    }
                ]
	      	},
	      	{
				test: /\.(woff|woff2|eot|ttf|otf)$/,
				use: [
					{
						loader:'file-loader',
						options: {
						  	limit: 8192,
						  	name:'resource/[name].[ext]'
						}
					}
				]
			}
		]
	},
	plugins: [
		// 处理html文件
		new HtmlWebpackPlugin({
			title:"电商管理平台",
			template:"./src/index.html"
		}),
		// 独立css文件
		new ExtractTextPlugin("css/[name].css"),
		// 提出公共模块
		new webpack.optimize.CommonsChunkPlugin({
			name:'common',
			filename:'js/base.js'
		})
	],
	devServer: {
    	port:3010
	}
};