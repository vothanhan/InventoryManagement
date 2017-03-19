var mongoose = require('mongoose');
var ObjectId= mongoose.Schema.ObjectId;

module.exports = mongoose.model('Product',{
	id : {type:ObjectId},
	name : String,
	price : Number,
	type : String
})