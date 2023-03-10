const express = require('express');
const loginRouter = express.Router();
const loginMiddleware = require('../controllers/loginMiddleware.js');
// const db = require('../models/splitItModels.js');
const db = require('../models/splitItModels.js');
//const bcrypt = require('../controllers/hashing.js'); 
const verify = require('../controllers/verifyUser.js');

// loginRouter.get('/', verify.compareUP,(req, res) => {
// //loginRouter.get('/', loginMiddleware.login, (req, res) => {
//   res.status(200).json('User successfully logged in');
// });

loginRouter.post('/', loginMiddleware.login, (req, res) => {
  res.status(200).json('User Logged In');
});

module.exports = loginRouter;
