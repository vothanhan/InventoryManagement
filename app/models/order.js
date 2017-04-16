var mongoose = require('mongoose');
var schema= new mongoose.Schema({
	name: String,
	supplierName : String,
	batch: [{
		productID: String,
		amount: Number
	}],
	isSolved:Boolean,
	price: Number
},{timestamps:true});

module.exports = mongoose.model('Order',schema);