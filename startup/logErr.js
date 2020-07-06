require('express-async-errors');
require('winston-mongodb');
const winston = require('winston');
const error = require('../middleware/error');

module.exports = function(){
	process.on('uncaughtException',(ex)=>{
	console.log(ex);
	winston.log('error',ex.message);
	
})

process.on('unhandledRejection',(ex)=>{
	console.log('we got an uphandledRejection ');
	winston.log('error',ex.message);
	
})





winston.add(winston.transports.File, { filename : 'logerror'});
winston.add(winston.transports.MongoDB, { db : 'mongodb://localhost/vidly'});
}