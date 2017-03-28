// Modules=======
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var mongoose=require('mongoose');
const fs=require('fs');

mongoose.Promise=global.Promise;

// Configuration =============
//var db = require('./config/db.js');

//set port
var port = process.env.PORT || 3000

//connect to mongoDB

//mongoose.connect(db.url);
//parse application/json
app.use(bodyParser.json());
// parse application/x-www-form-urlencoded
app.use(bodyParser.json({type:'application/vnd.api+json'}))
//override with the X-HTTP-method-override header in the request
app.use(methodOverride('X-HTTP-Method-Override'));

// sass preprocessing ==================
sass = require('node-sass');
sass.render({
	file:"./app/css/bundle.scss",
	outputStyle:"compressed"
},function(error,result){
	if(error){
		console.log(error.status); // used to be "code" in v2x and below 
		console.log(error.column);
		console.log(error.message);
		console.log(error.line);
	}
	fs.writeFile("./app/css/bundle.css",result.css.toString(),function(err){
		if(err) {
			return console.log(err);
		}
	});
	
});

//set the static files location
app.use(express.static(__dirname+'/app'))
app.use(express.static(__dirname+'/libs'))
app.use(express.static(__dirname+'/public'))

// route =============
var router=express.Router();
require('./app/routes')(app);
require('./app/api/product')(router);
require('./app/api/supplier')(router);
require('./app/api/order')(router);
require('./app/api/user')(router);

app.use(router);



//start app
// startup our app at http://localhost:3000
app.listen(port);

console.log("Start server on port 3000");

exports = module.exports = app;