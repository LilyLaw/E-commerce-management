const path 				= require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
	entry: './src/app.jsx',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'app.js'
	},
	plugins: [
		new HtmlWebpackPlugin({
			title:"电商管理平台",
			template:"./src/index.html"
		}),
		new ExtractTextPlugin("index.css"),
	],
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
		    }
		]
	}
};