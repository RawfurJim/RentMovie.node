const winston = require('winston');
const express = require('express');
const app = express();


require('./startup/logErr')();
require('./startup/routes')(app);
require('./startup/db')();
require('./startup/configaration')();



const port = process.env.PORT || 3001;

app.listen(port,()=>{
	winston.info(`start server ${port}`);
})

