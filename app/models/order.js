var mongoose = require('mongoose');

module.exports = mongoose.model('Order',{
	name: String,
	supplierName : String,
	batch: [String],
	price: Number,
	isSolved:Boolean
})