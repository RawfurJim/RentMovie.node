const admin = require('../middleware/admin');
const express = require('express');
const mongoose = require('mongoose');
const {Jhonra , validate} = require('../model/jhonra');
const auth = require('../middleware/auth');

const router = express.Router();




router.get('/' , async(req,res)=>{
	
    const jhonra = await Jhonra.find();
    res.send(jhonra);
	
});
router.get('/:id' , async(req,res)=>{
	
		const jhonra = await Jhonra
	    .findById(req.params.id)
	    .select({name : 1})

     if (!jhonra) return res.status(404).send('The genre with the given ID was not found.');

    res.send(jhonra);

});


router.post('/' ,auth, async(req,res)=>{
	
   
    const j = validate(req.body);
    if(j.error){
    	res.status(400).send(j.error.details[0].message);
    	return;
    }
     const jhonra = new Jhonra({
	    name : req.body.name
		

    });
	
    const result =  await jhonra.save();

    res.send(result);

   
  



});





router.put('/:id', auth, async(req,res)=>{
	
		const jhonra = await Jhonra
	    .findById(req.params.id);

		const j = validate(req.body);
		if(j.error){
			res.status(400).send(j.error.details[0].message);
		}
		else{
			jhonra.name = req.body.name;
		
		
		 const result =  await jhonra.save();
		 res.send(result);
		}
		
	
		 
		

	
	
});
router.delete('/:id',[auth ,admin], async (req,res)=>{
	
		const jhonra = await Jhonra
	    .findByIdAndRemove(req.params.id)
	    
		if(!jhonra){
			res.status(404).send('not found');
			return;
		}
		res.send(jhonra);
	
});
	

module.exports = router;



