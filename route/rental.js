const auth = require('../middleware/auth');

const express  =require('express');
const mongoose = require('mongoose');
const {Rental , validate}  = require('../model/rental');
const {Customer} = require('../model/customer');
const {Movie}  = require('../model/movie');
const {Jhonra}  = require('../model/jhonra');

const Fawn = require('fawn');




const router = express.Router() ;

Fawn.init(mongoose);

router.get('/',async(req,res)=>{
	const rental = await Rental
	    .find()

		.select('-_id -__v ');

		 
    res.send(rental);
})

router.post('/',auth, async (req,res)=>{
	const r = validate(req.body);
	if(r.error){
		res.status(400).send(r.error.details[0].message);
        return;
	}
	let customerm = await Customer.findById(req.body.customerId);

	if(!customerm){
		res.status(400).send('invalid Customer Id');
		return;
	}
	
	let moviem = await Movie.findById(req.body.movieId)
	if(!moviem) {
		res.status(400).send('invalid Movie Id');
		return;
	}
	if(moviem.numberInstock ==0){
		res.status(400).send('no movie available');
	}
	
	const rental = new Rental({
		customer : {
			_id : customerm._id,
			name : customerm.name,
			isGold : customerm.isGold,
			phone : customerm.phone

			
		},
		movie : {
			_id : moviem._id,
			title : moviem.title,
			dailyRentalRate : moviem.dailyRentalRate
		}
	});

	
	try {
    new Fawn.Task()
     .save('rentals',rental)
     .update('movies' ,{_id : moviem._id},{$inc :{numberInstock : -1}
 } )
     
     
     .run();
  res.send(rental);

  }
  catch(ex){
    res.status(500).send('Somethig failed');
  }
	    
});

module.exports = router;