const {User,validate} = require('../model/user');
const express  = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const router = express.Router();


router.get('/me',auth, async(req,res)=>{
	const user = await User.findById(req.user._id).select('-password');
	res.send(user);
})


router.post('/',async(req,res)=>{
	const u = validate(req.body);
	if(u.error){
		res.status(400).send(u.error.details[0].message);
		return;
	}
	let uf = await User.findOne({email : req.body.email});
	if(uf){
		res.status(400).send('already resgestered');
	}

	const user = await new User({
		name:req.body.name,
		email:req.body.email,
		password:req.body.password

	});
	const salt = await bcrypt.genSalt(10);
	user.password = await bcrypt.hash(user.password, salt);
    await user.save();
    const token = user.getAuthToken();

	
	res.header('x-auth-token',token).send([user.name,user.email]);
})

module.exports = router;