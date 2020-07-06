const winston = require('winston');

function error(err,req,res,next){
	winston.log('error',err.message);
	res.status(500).send('something failed');
}

module.exports = error;