const express = require('express');
const createRouter = express.Router();
const db = require('../models/splitItModels.js');
const hashing = require('../controllers/hashing.js');
const verify = require('../controllers/verifyUser.js');
const login  = require ('../controllers/loginMiddleware');

createRouter.post(
  '/',
  hashing.hashPassword,
  login.register,
  (req, res) => {
    console.log('created user');
    res.status(200).json(req.body);
  },
);

module.exports = createRouter;

//verify.compareUP, hashing.hashUsername,