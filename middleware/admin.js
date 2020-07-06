const jwt = require('jsonwebtoken');
const config = require('config');


function admin (req, res, next){
    const token = req.header('x-auth-token');
    if(!req.user.admin){
        res.status(403).send('not Welcome');
        return;
    }
    next();

}

module.exports = admin;
