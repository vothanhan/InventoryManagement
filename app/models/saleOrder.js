var mongoose = require('mongoose');
var schema= new mongoose.Schema({
	name: String,
	batch: [{
		productID: String,
		amount: Number
	}],
	price: Number
},{timestamps:true});

module.exports = mongoose.model('SaleOrder',schema);