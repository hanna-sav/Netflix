const express = require('express');
const rout =express.Router();


rout.get('/', (req, res) => {
    res.render('index',{title:'Netflix movie router', message:'Welcome to Netlix, the best movie router ever'});
});

module.exports = rout;