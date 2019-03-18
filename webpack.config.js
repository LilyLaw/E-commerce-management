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
			title:"电商管理平台"
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
			}
		]
	}
};