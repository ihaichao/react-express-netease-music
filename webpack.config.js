const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
module.exports = {
	devtool: 'eval-source-map', //生成Source Maps,这里选择eval-source-map
	entry: [path.resolve(__dirname, './client/index.js')], //唯一入口文件
	output: { //输出目录
		path: __dirname + "/public", //打包后的js文件存放的目录
		filename: 'js/bundle.js', //打包后的js文件名
		publicPath: 'http://127.0.0.1:3000/'
	},
	module: {
		loaders: [
			{
				test: /\.(js|jsx)?$/,
				exclude: /node_modules/, //屏蔽不需要处理的文件（文件夹）（可选）
				loader: 'babel-loader',//es6转es5
			},
			{
				test: /\.css$/,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: [
						'css-loader', 'less-loader'
					]
				})
			},
			{
				test: /\.less$/,
				loader: 'style-loader!css-loader!less-loader'
			},
			{
				test: /\.(png|jpg)$/,
				loader: 'url-loader?limit=25000'
			}
		]
	},
	plugins: [
		new ExtractTextPlugin('css/main.css'),
		new CompressionWebpackPlugin({ //gzip 压缩
			asset: '[path].gz[query]',
			algorithm: 'gzip',
			test: new RegExp(
				'\\.(js|css)$'    //压缩 js 与 css
			),
			threshold: 10240,
			minRatio: 0.8
		}),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoEmitOnErrorsPlugin(),
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false
			}
		})
	]
}