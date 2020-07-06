const express = require('express');
const mongoose = require('mongoose');
const {Customer,validate} = require('../model/customer');
const auth = require('../middleware/auth');

const router = express.Router();


router.get('/' , (req,res)=>{
	async function display(){
		const customer = await Customer.find();
		res.send(customer);
	}
	display();
});
router.get('/:id' , (req,res)=>{
	async function display(){
	 const customer = await Customer
	    .findById(req.params.id)
	    

     if (!customer) return res.status(404).send('The genre with the given ID was not found.');

    res.send(customer);
}
display();
	
	

	
});


router.post('/' ,auth, (req,res)=>{
	async function createCustomer(){
   
    const c = validate(req.body);
    if(c.error){
    	res.status(400).send(c.error.details[0].message);
    	return;
    }
     const customer = new Customer({
	    name : req.body.name,
	    isGold : req.body.isGold,
	    phone : req.body.phone
		

    });
	
    const result =  await customer.save();

    res.send(result);

}
createCustomer();
});





router.put('/:id',auth,(req,res)=>{
	async function updateCustomer(){

		 const customer = await Customer
	    .findById(req.params.id);

		const c = validate(req.body);
		if(c.error){
			res.status(400).send(c.error.details[0].message);
		}
		else{
			customer.name = req.body.name;
			customer.isGold = req.body.isGold;
			customer.phone = req.body.phone;
		
		
		 const result =  await customer.save();
		 res.send(result);
		}
		
		

	}
	updateCustomer();
});
router.delete('/:id',auth,(req,res)=>{
	async function deleteCustomer(){

		const customer = await Customer
	    .findByIdAndRemove(req.params.id)
	    
		if(!customer){
			res.status(404).send('not found');
			return;
		}
		res.send(customer);
	}
		
 
 
	deleteCustomer();
});

		

	
		

module.exports = router;


