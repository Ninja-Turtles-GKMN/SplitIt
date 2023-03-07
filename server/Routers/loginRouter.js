const express = require('express');
const loginRouter = express.Router();
const db = require('../models/splitItModels.js');
const bcrypt = require('../controllers/bcrypt.js'); 
const verify = require('../controllers/verifyUser.js');

loginRouter.get('/', bcrypt.hashUsername, bcrypt.hashPassword, verify.compareUP,(req, res) => {
  res.status(200).json('User successfully logged in');
});

loginRouter.post('/', (req, res) => {
  res.status(200).json('User successfully registered');
});

module.exports = loginRouter;
