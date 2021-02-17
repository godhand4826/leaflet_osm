const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')

module.exports = {
	mode: 'development',
	entry: {
		index: './src/index.jsx',
	},
	output: {
		publicPath: '/',
		filename: '[name].bundle.js',
		path: path.resolve(__dirname, 'dist'),
	},
	module: {
		rules: [{
			test: /\.jsx$/,
			exclude: /node_modules/,
			use: 'babel-loader',
			resolve: {
				extensions: ['.jsx']
			},
		}, {
			test: /\.(sc|sa|c)ss$/,
			use: ['style-loader', 'css-loader', 'sass-loader']
		},{
			test:/\.(png|svg|jpg|jpeg|gif)$/,
			use: [{
				loader:'file-loader',
				options:{
					outputPath:'.',
					name:'[name].[ext]'
				}
			}]
		}],
	},
	optimization: {
		splitChunks: {
			chunks: 'all',
			cacheGroups: {
				vendors: {
					chunks: 'all',
					test: /[\\/]node_modules[\\/]/,
					name: 'vendors',
					priority: -10,
				},
			}
		},
		minimize: true,
		minimizer: [new TerserPlugin({
			terserOptions: {
				format: {
					comments: false,
				},
			},
			extractComments: false
		})]
	},
	plugins: [
		new HtmlWebpackPlugin({ template: 'src/template.html' }),
		new CleanWebpackPlugin({ verbose: true })
	]
}