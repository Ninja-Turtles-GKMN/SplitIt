const express = require('express');
const loginRouter = express.Router();
// const db = require('../models/splitItModels.js');

loginRouter.get('/', (req, res) => {
  res.status(200).json('User successfully logged in');
});

loginRouter.post('/', (req, res) => {
  res.status(200).json('User successfully registered');
});

module.exports = loginRouter;
