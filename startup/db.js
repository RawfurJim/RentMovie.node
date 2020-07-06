const mongoose = require('mongoose');
const Joi = require('joi');
const winston = require('winston');

module.exports = function(){
	mongoose.connect('mongodb://localhost/vidly')
    .then(()=> winston.info('successfull'));
    
}