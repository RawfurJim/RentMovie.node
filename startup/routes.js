const express = require('express');

const pathJhonra = require('../route/jhonra.js');
const pathCustomer = require('../route/customer.js');
const pathMovie = require('../route/movie.js');
const pathRental = require('../route/rental.js');
const pathUser = require('../route/user.js');
const pathAuth = require('../route/auth.js');
const pathReturn = require('../route/return.js');

const error = require('../middleware/error');

module.exports = function(app){

    app.use(express.json());
    app.use('/api/jhonras',pathJhonra);
    app.use('/api/customer',pathCustomer);
    app.use('/api/movie',pathMovie);
    app.use('/api/rental',pathRental);
    app.use('/api/user',pathUser);
    app.use('/api/auth',pathAuth);
    app.use('/api/return',pathReturn);

    app.use(error);
}