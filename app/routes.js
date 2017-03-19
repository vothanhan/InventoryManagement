var Product= require('./models/product.js');

module.exports = function(app){
	//server routes ==========
	//handle api call
	//authentiacation routes
	app.get('/',function(req,res){
		res.sendFile(__dirname+'/view/index.html');
	});

};