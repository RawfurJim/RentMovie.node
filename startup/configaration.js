
const error = require('../middleware/error');

const config = require('config');

module.exports = function(){
	if(!config.get('jwtPrivatekey')){
      console.log('!Error...Did not set jwtPrivatekey');
      process.exit(1);
}
}