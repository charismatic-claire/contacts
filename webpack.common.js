const path = require('path')
const webpack = require('webpack')
const { VueLoaderPlugin } = require('vue-loader')
const StyleLintPlugin = require('stylelint-webpack-plugin')

module.exports = {
	entry: path.join(__dirname, 'src', 'main.js'),
	output: {
		path: path.resolve(__dirname, './js'),
		publicPath: '/js/',
		filename: 'contacts.js',
		chunkFilename: 'chunks/[name].js'
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: ['vue-style-loader', 'css-loader']
			},
			{
				test: /\.scss$/,
				use: ['vue-style-loader', 'css-loader', 'sass-loader']
			},
			{
				test: /\.(js|vue)$/,
				use: 'eslint-loader',
				enforce: 'pre'
			},
			{
				test: /\.vue$/,
				loader: 'vue-loader'
			},
			{
				test: /\.js$/,
				loader: 'babel-loader',
				exclude: /node_modules/
			},
			{
				test: /\.(png|jpg|gif|svg)$/,
				loader: 'file-loader',
				options: {
					name: '[name].[ext]?[hash]'
				}
			}
		]
	},
	plugins: [
		new VueLoaderPlugin(),
		new StyleLintPlugin(),
		new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
	],
	resolve: {
		alias: {
			Components: path.resolve(__dirname, 'src/components/'),
			Mixins: path.resolve(__dirname, 'src/mixins/'),
			Models: path.resolve(__dirname, 'src/models/'),
			Services: path.resolve(__dirname, 'src/services/'),
			Views: path.resolve(__dirname, 'src/views/')
		},
		extensions: ['*', '.js', '.vue', '.json']
	}
}
