var webpack = require('webpack');
module.exports = {
	entry: {
		app:'./app/app',
		vendor:['jquery','angular','bootstrap','angular-ui-router']
	},
	output: {
		path: __dirname + '/app/js',
		filename:'app.bundle.js'
	},
	resolve: {
		modules:["node_modules","./libs"],
		descriptionFiles:["package.json","bower.json"]
	},
	plugins: [
		new webpack.optimize.CommonsChunkPlugin(/* chunkName= */{name:"vendor",filename:'vendor.bundle.js'})
	]
},function (err,stats){
	if (err)
		console.log(err);
	console.log(stats);
};