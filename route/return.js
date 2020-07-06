const auth = require('../middleware/auth');
const Joi = require('joi');
const express  =require('express');
const mongoose = require('mongoose');
const {Rental }  = require('../model/rental');
const {Movie} = require('../model/movie');
const {Customer} = require('../model/customer');
const moment = require('moment');

const router = express.Router() ;

router.post('/',auth ,async(req,res)=>{
	const r = validationReturn(req.body);
	if(r.error){
		res.status(400).send(r.error.details[0].message);
		return;
	}
	
	let customer = await Customer.findById(req.body.customerId);
	if(!customer){
		res.status(400).send('invalid customer Id');
		return;
	}
	let movie = await Movie.findById(req.body.movieId);
	if(!movie){
		res.status(400).send('invalid movie Id');
		return;
	}
	const rental = await Rental.findOne({
		'customer._id' :req.body.customerId, 
		'movie._id' :req.body.movieId,
	})
	if(!rental){
		res.status(400).send('invalid rental');
	}
	if(rental.dateReturn){
		res.status(400).send('already returned');
	}
	const date = new Date();
    const rentalDays = moment().diff(rental.dateOut, 'days');
	const fee = (rentalDays) * movie.dailyRentalRate; 
	
	await rental.update({dateReturn : date ,  rentalFee : fee});
	await Movie.update({_id : rental.movie._id},{$inc :{numberInstock : 1}});
	const result = await Rental.findOne({
		'customer._id' :req.body.customerId, 
		'movie._id' :req.body.movieId,
	})
	res.send(result);

})

function validationReturn(value){
	const schema = {
		customerId : Joi.objectId().required(),
		movieId : Joi.objectId().required()
	}
	const result = Joi.validate(value,schema);
	return result;
};


module.exports = router;
