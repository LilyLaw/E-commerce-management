const path 				= require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

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
		})
	],
	module: {
		rules: [
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
			{
	        	test: /\.css$/,
	        	use: [
			        'style-loader',
			        'css-loader'
		        ]
	       }
		]
	}
};