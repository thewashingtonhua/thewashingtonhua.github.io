const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
	target: "web",
	devtool: 'eval-source-map',
	entry: {
		bundle: [path.resolve(__dirname, './src/entry.jsx')]
	},
	output: {
		path: path.resolve(__dirname, './dist'),
		filename: '[name].js'
	},
	module: {
		loaders: [
			{
				test: /\.json$/,
				exclude: /node_modules/,
				loader: 'json'
			},
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				loader: 'babel'
			},
			{
				test: /\.scss$/,
				exclude: /node_modules/,
				loader: ExtractTextPlugin.extract("css!sass?sourceMap")
			},
			{
				test: /\.(jpg|png)$/,
				loader: "url?limit=8192"
			}
		]
	},
	/*postcss: [
		require('autoprefixer')
	],*/
	plugins: [
		new CleanWebpackPlugin(['dist/**/*'], {
    		root: path.resolve(__dirname),
    		verbose: true,
    		dry: false,
    		exclude: []
    	}),
		new ExtractTextPlugin("[name].css"),
		new webpack.optimize.CommonsChunkPlugin('vendor'),
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false
			}
		})/*,
		new HtmlWebpackPlugin({
			title: '安飞士租车',
			filename: '../../application/views/index.html',
			template: './src/index.html',
			inject: true,
			minify: {}
		})*/
	],
	resolve:{
		extensions:['', '.js', '.jsx', '.json']
	},
	devServer: {
		colors: true,
		historyApiFallback: true,
		inline: true,
		hot: true,
		port: 7777
	}/*,
	eslint: {
		configFile: './.eslintrc.js'
	}*/
};
