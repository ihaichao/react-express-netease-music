const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const svgDirs = [
	require.resolve('antd-mobile').replace(/warn\.js$/, ''),
	path.resolve(__dirname, '/public/svgs')
]

module.exports = {
	devtool: 'eval-source-map', // 生成Source Map,这里选择eval-source-map
	entry: ['webpack-hot-middleware/client?reload=true', path.resolve(__dirname, './client/index.js')], // 唯一入口文件
	output: { //输出目录
		path: __dirname + "/public", // 打包后的js文件存放的目录
		filename: 'js/bundle.js', // 打包后的js文件名
		publicPath: 'http://127.0.0.1:3000/'
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)?$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
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
			},
			{
				test: /\.(svg)$/i,
				loader: 'svg-sprite-loader',
				include: svgDirs
			}
		]
	},
	resolve: {
		extensions: ['.web.js', '.js', '.json'],
		modules: ['node_modules', path.join(__dirname, './node_modules')]
	},
	plugins: [
		new ExtractTextPlugin('css/main.css'),
		new CompressionWebpackPlugin({
			asset: '[path].gz[query]',
			algorithm: 'gzip',
			test: new RegExp(
				'\\.(js|css)$'   
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