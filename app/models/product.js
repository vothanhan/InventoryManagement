var mongoose = require('mongoose');

module.exports = mongoose.model('Product',{
	name : String,
	sellPrice : Number,
	buyPrice: Number,
	itemType : String,
	stock: Number,
	restockAmount: Number,
	unit: String,
	changeHistory: [{
		amount: Number,
		reason: String,
		currentStock:Number,
		date: Date,
		orderID:String
	}],
	purchaseOrder:[{
		orderID:String
	}]
	,
	sellHistory: [{
		orderID:String
	}]
})