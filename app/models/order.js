var mongoose = require('mongoose');
var schema= new mongoose.Schema({
	name: String,
	supplierName : String,
	batch: [{
		productID: String,
		amount: Number
	}],
	isSolved:Boolean
},{timestamps:true});

module.exports = mongoose.model('Order',schema);