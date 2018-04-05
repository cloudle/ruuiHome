const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const colors = require('colors');

const env = process.env.ENV || 'dev',
	port = process.env.PORT || 3000,
	isProduction = env === 'production',
	publicPath = isProduction ? '/' : `http://localhost:${port}/`,
	htmlOptions = { isProduction, publicPath, useVendorChunks: false },
	optionalPlugins = [],
	polyfills = ['babel-polyfill'],
	entry = ['./index.web.js'],
	hot = [
		'react-hot-loader/patch',
		`webpack-dev-server/client?${publicPath}`,
		'webpack/hot/only-dev-server',
	];

if (!isProduction) {
	optionalPlugins.push(new webpack.HotModuleReplacementPlugin());
	optionalPlugins.push(new webpack.NamedModulesPlugin());
	optionalPlugins.push(new webpack.NoEmitOnErrorsPlugin());

	if (require('fs').existsSync('./web/vendor-manifest.json')) {
		htmlOptions.useVendorChunks = true;
		optionalPlugins.push(new webpack.DllReferencePlugin({
			context: '.', manifest: require('./web/vendor-manifest.json'),
		}));
	}

	if (!htmlOptions.useVendorChunks) {
		console.log('(serving without '.grey + 'common-library-cache'.green +
			', run '.grey + 'yarn vendor'.magenta + ' once to boost up build speed)'.grey);
	}

	optionalPlugins.push(new ProgressBarPlugin({
		width: 39, complete: '▓'.green.bgGreen, incomplete: ' '.green.bgWhite,
		format: 'Build (:bar) (:elapsed seconds)',
		summary: false, customSummary: (buildTime) => {
			console.log('Build completed after', ` ${buildTime} `.bgGreen);
		},
	}));
} else {
	optionalPlugins.push(new webpack.optimize.UglifyJsPlugin());
}

const getRevisionPromise = new Promise((resolve, reject) => {
	require('child_process').exec('git rev-parse HEAD', (err, stdout) => {
		if (err) reject(err);
		else resolve(stdout.toString().trim());
	});
});

module.exports = getRevisionPromise.then((gitHash) => {
	return {
		cache: true,
		devtool: isProduction ? false : 'eval-source-map',
		entry: {
			app: isProduction ? [...polyfills, ...entry] : [...polyfills, ...hot, ...entry]
		},
		output: {
			publicPath, path: path.join(__dirname, 'web'),
			filename: isProduction ? `${gitHash}.js` : '[name].js',
			chunkFilename: '[name].js',
		},
		resolve: {
			alias: {
				'react-native': 'react-native-web',
			},
			modules: ['node_modules'],
			extensions: ['.js']
		},
		module: {
			rules: [
				{
					test: /\.js?$/,
					loader: 'babel-loader',
					options: {
						cacheDirectory: true,
						plugins: ['react-hot-loader/babel', ]
					}
				},
				{ test: /\.css$/, loader: 'style-loader!css-loader' },
				{
					test: /\.(png|jpg|svg|ttf)$/,
					loader: 'file-loader?name=[name].[ext]'
				},
				{
					test: /\.json/,
					loader: 'json-loader'
				},
				{
					test: /\.md/,
					loader: 'raw-loader',
				}
			],
		},
		plugins: [
			new webpack.DefinePlugin({
				ENV: JSON.stringify(env),
				'process.env.NODE_ENV': JSON.stringify(env),
			}),
			new webpack.optimize.OccurrenceOrderPlugin(),
			new HtmlWebpackPlugin(Object.assign(htmlOptions, {
				template: 'index.ejs',
				filename: 'index.html',
			})),
			...optionalPlugins,
		]
	};
});