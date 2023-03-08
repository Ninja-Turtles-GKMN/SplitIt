const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const loginRouter = require('./Routers/loginRouter');
const expenseRouter = require('./Routers/expenseRouter');
const createRouter = require('./Routers/createRouter'); 
const app = express();
const PORT = 3000;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//routers

// for logging in a user
app.use('/login', loginRouter);
// create is for creating a user
app.use('/create', createRouter)
//for the homepage
app.use('/expense', expenseRouter);
app.get('/', (req, res) => {
  return res.status(200).send('test')
})

app.use('*', (req, res) => {
  res.status(404).json('Invalid request: No route exists');
});

//global error handler

app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: err.status || 500,
    message: { err: 'An error occurred' },
  };
  let errorObj = { ...defaultErr, ...err };
  return res.status(errorObj.status).json(errorObj.message.err);
});

app.listen(PORT, (e) => {
  if (e) console.log(e);
  else {
    console.log(`Server listening on port: ${PORT}`);
  }
});
