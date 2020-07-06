const mongoose = require('mongoose');

const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);


const {Jhonra , validate , jhonraSchema} = require('./jhonra');


const movieSchema = mongoose.Schema({
	title : {
		type :String,
		required : true
	},
	jhonra : {
		type : jhonraSchema,
		required :true
	},
	numberInstock : {
		type : Number,
		min  : 0,
		required : true,
		
	},
	dailyRentalRate : {
		type : Number,
		required : true
		
	}
})

const Movie = mongoose.model('movie',movieSchema);


function validationMovie(value){
	const schema = {
		title : Joi.string().required(),
		jhonraId : Joi.objectId().required(),
		numberInstock :  Joi.number().required(),
		dailyRentalRate :  Joi.number().required(),
	}

	const result = Joi.validate(value,schema);
	return result;
		
	};

exports.Movie = Movie;
exports.validate = validationMovie;
exports.movieSchema = movieSchema;
