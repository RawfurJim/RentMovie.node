const mongoose = require('mongoose');
const Joi = require('joi');


const jhonraSchema = mongoose.Schema({
	name: {
		type:String,
		required :true
	}	
})

const Jhonra = mongoose.model('jhonra', jhonraSchema);

		
function validationJhonra(value){
	const schema = {
		name : Joi.string().alphanum().min(3).max(30).required(),
		
	}

	const result = Joi.validate(value,schema);
	return result;
		
	};
exports.Jhonra = Jhonra;
exports.validate = validationJhonra;
exports.jhonraSchema = jhonraSchema;
