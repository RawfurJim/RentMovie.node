const mongoose = require('mongoose');

const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const {Movie,  movieSchema } = require('./movie');
const {Customer, customerSchema} = require('./customer');




const rentalSchema = new mongoose.Schema({
	customer : {
		type: customerSchema,
		required :true

	},
	movie : {
		type : movieSchema,
		retuired : true
	},
	dateOut : {
		type : Date,
		require : true,
		default : Date.now
	},
	dateReturn :{
		type : Date
	},
	rentalFee: { 
    type: Number, 
    min: 0
  }

})

const Rental = mongoose.model('rental' , rentalSchema);

function validationRental(value){
	const schema = {
		customerId : Joi.objectId().required(),
		movieId : Joi.objectId().required()
	}
	const result = Joi.validate(value,schema);
	return result;
};


exports.Rental = Rental;
exports.validate = validationRental;

