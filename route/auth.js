const {User} = require('../model/user');
const express  = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const config = require('config');


const router = express.Router();

router.post('/',async(req,res)=>{
	const u = validationAuth(req.body);
	if(u.error){
		res.status(400).send(u.error.details[0].message);
		return;
	}
	let user = await User.findOne({email : req.body.email});
	if(!user){
		res.status(400).send('invalid Email or Password');
	}

	const validPassword = await bcrypt.compare(req.body.password, user.password)
	if(!validPassword){
		res.status(400).send('invalid Email or Password');
	}
	const token = user.getAuthToken();
	
	res.send(token);
})
function validationAuth(value){
 	const schema ={
 		
	    password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
	    email: Joi.string().email({ minDomainAtoms: 2 })
 	}
 	const result = Joi.validate(value,schema);
 	return result;
}

module.exports = router;