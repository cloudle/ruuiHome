const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const configPromise = require('./webpack.config');
const colors = require('colors');

const port = process.env.PORT || 3000;
const optimizeMode = process.env.OPTIMIZE !== undefined;

console.log('Preparing super awesome dev-server at', ` localhost:${port} `.bgGreen, ':p');

configPromise.then((configs) => {
	const compiler = webpack(configs);

	new WebpackDevServer(compiler, {
		publicPath: configs.output.publicPath,
		port, contentBase: 'web', hot: true,
		historyApiFallback: true,
		headers: {
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
			'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization'
		},
		stats: { /* https://webpack.js.org/configuration/stats/#stats */
			assets:					optimizeMode,
			colors:					true,
			version:				true,
			hash:						optimizeMode,
			timings:				true,
			chunks:					optimizeMode,
			performance:		optimizeMode,
			modules:				optimizeMode,
			moduleTrace:		optimizeMode,
			modulesSort:		'size',
			chunkModules:		optimizeMode,
			chunkOrigins:		optimizeMode,
			cached:					true,
			error:					true,
			cachedAssets:		optimizeMode,
		},
		quiet: !optimizeMode,
		noInfo: !optimizeMode,
		overlay: true,
	}).listen(port, 'localhost', (err, result) => {
		if (err) console.log(err);
		return true;
	});
});