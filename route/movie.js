const express = require('express');
const mongoose = require('mongoose');
const Fawn = require('fawn');

const {Movie , validate } = require('../model/movie');
const {Jhonra } = require('../model/jhonra');


const router = express.Router();



router.get('/' , async(req,res)=>{
	
	const movie = await Movie
		.find()

		.select('-_id -__v -jhonra._id');

		 
    res.send(movie);
	
	


})

router.post('/', async (req,res)=>{
	
	const m = validate(req.body);
	if(m.error){
	    res.status(400).send(m.error.details[0].message);
        return;
	}
	//let jhonram = await Jhonra.findById();
	
	let jhonram = await Jhonra.findById(req.body.jhonraId)
        

    if(!jhonram) return res.status(400).send('not found');
		
		
	

	    const movie = new Movie({
	    	title : req.body.title,
	    	jhonra : {
	    		_id : jhonram._id,
	    		name:jhonram.name
	    		
	    	},
	    	numberInstock : req.body.numberInstock,
	    	dailyRentalRate : req.body.dailyRentalRate

	    })
	    const result = await movie.save();
	    res.send(result);
	
})

router.put('/:id',async(req,res)=>{
	const m = validate(req.body);
	if(m.error){
	    res.status(400).send(m.error.details[0].message);
        return;
	}
	//let jhonram = await Jhonra.findById();
	
	let jhonram = await Jhonra.findById(req.body.jhonraId)
       

  const movie = await Movie.findByIdAndUpdate(req.params.id,
    { 
      title: req.body.title,
      jhonra : {
	    		_id : jhonram._id,
	    		name : jhonram.name
	    	},
      numberInStock: req.body.numberInStock,
      dailyRentalRate: req.body.dailyRentalRate
    }, { new: true });

  if (!movie) return res.status(404).send('The movie with the given ID was not found.');
  
  res.send(movie);
});


router.delete('/:id',(req,res)=>{
	async function dateteJhonra(){

		const movie = await Movie
	    .findByIdAndRemove(req.params.id)
	    
		if(!movie){
			res.status(404).send('not found');
			return;
		}
		res.send(movie);
	}
		
 
 
	deleteJhonra();
});




	module.exports = router;