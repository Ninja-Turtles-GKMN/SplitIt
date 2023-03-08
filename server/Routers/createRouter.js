const express = require('express');
const createRouter = express.Router();
const db = require('../models/splitItModels.js');
const hashing = require('../controllers/hashing.js'); 
const verify = require('../controllers/verifyUser.js');

createRouter.post('/', hashing.hashUsername, hashing.hashPassword, verify.compareUP, (req, res) => {
// createRouter.post('/', (req, res) => {
//     if(req.cookies.asdf) {
//         console.log('redirecting');
//         return res.redirect('');
//     }
    console.log('we are here');
    res.status(200).json(req.body);
});


module.exports = createRouter;