const express = require('express');
require('dotenv').config();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const loginRouter = require('./Routers/loginRouter');
const expenseRouter = require('./Routers/expenseRouter');
const createRouter = require('./Routers/createRouter');
const {getAccessToken, getGitHubUser}  = require('./controllers/oAuth');
const app = express();
const PORT = 3000;
const corsOptions = {
  origin: 'http://localhost:8080',
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//routers

//callback for return token from github after success login
app.get('/github/callback', getAccessToken, getGitHubUser, (req, res) => {
  res.cookie('session', res.locals.user)
  console.log(res.locals.userData); 
  console.log(res.locals.user);
  res.status(200).redirect('http://localhost:8080/home/')
})

//redirects user to Github sign in page
app.get('/github', (req, res) => {
  const url = `https://github.com/login/oauth/authorize?client_id=${process.env.CLIENT_ID}&redirect_uri=http://localhost:3000/github/callback`
  res.redirect(url)
})


// for logging in a user
app.use('/login', loginRouter);
// create is for creating a user
app.use('/create', createRouter);
//for the homepage
app.use('/expense', expenseRouter);
app.get('/', (req, res) => {
  return res.status(200).send('test');
});

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
