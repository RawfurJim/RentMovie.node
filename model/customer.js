const mongoose = require('mongoose');
const Joi = require('joi');

const customerSchema = mongoose.Schema({
	name: {
		type:String,
		required :true
	},
	isGold: {
		type:Boolean,
		
		default:false

		
	},
	phone: {
		type:Number,
		required :true
	}
		

		
	
})

const Customer  = mongoose.model('customer', customerSchema);


function validationCustomer(value){
	const schema = {
		name : Joi.string().min(3).max(30).required(),
		isGold : Joi.string(), 
		
		phone : Joi.string().min(3).max(30).required()
	}

	const result = Joi.validate(value,schema);
	return result;
		
	};

exports.Customer = Customer;

exports.validate = validationCustomer;
exports.customerSchema = customerSchema;