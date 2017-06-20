
var path = require('path');
var webpack = require('webpack');

module.exports = {
	entry: './js/App.js',
<<<<<<< HEAD
	output: {
		path: __dirname,
		filename: './js/bundle.js'
=======
	output: { 
		path: __dirname, 
		filename: './js/bundle.js' 
>>>>>>> 3025eaea46da5f9b8cb40783a170f3a6f5f030ec
	},

	module: {
		loaders: [
			{
				test: /.jsx?$/,
				loader: 'babel-loader',
				exclude: /node_modules/,
				query: {
					presets: ['es2015', 'react']
				}
			}
		]
	},
<<<<<<< HEAD
};
=======
};
>>>>>>> 3025eaea46da5f9b8cb40783a170f3a6f5f030ec
