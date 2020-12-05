const express = require('express');
const rout =express.Router();


rout.get('/', (req, res) => {
    res.render('index',{title:'Netflix movie app', message:'Welcome to Netlix, the best movie app ever'});
});

module.exports = rout;