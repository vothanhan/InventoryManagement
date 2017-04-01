var mongoose = require('mongoose');

module.exports = mongoose.model('Supplier',{
	name : String,
	phoneNumber: String
})