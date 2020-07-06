const mongoose = require('mongoose');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const config = require('config');



const userSchema = mongoose.Schema({
	name :{
		type:String,
		required:true
	},
	email :{
		type:String,
		required:true,
		unique : true
	},
	password :{
		type:String,
		required:true,
		unique : true
	},
	admin :{
		type: Boolean
	}
})

userSchema.methods.getAuthToken = function(){
	const token = jwt.sign({_id : this._id , admin: this.admin}, config.get('jwtPrivatekey'));
	return token;
}

const User = mongoose.model('user',userSchema);

 function validationUser(value){
 	const schema ={
 		name:Joi.string().min(3).max(30).required(),
	    password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
	    email: Joi.string().email({ minDomainAtoms: 2 })
 	}
 	const result = Joi.validate(value,schema);
 	return result;
}

exports.User = User;
exports.validate = validationUser;