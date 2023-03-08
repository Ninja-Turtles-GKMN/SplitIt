require('dotenv').config();
//console.log(process.env); 
// for the client ID and secret for github oath! check the .env file for more

const clientID = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET; 

redirectURI = 'http://localhost:8080'; 

async function getAccessToken (req, res, next) {
    try { 
        console.log(req.query); 
        const { code } = req.query; 
        console.log(code);
;        const body = {
            client_id : clientID, 
            client_secret : clientSecret,
            code
        }
        let response = await fetch('https://github.com/login/oauth/access_token', {
            method: 'POST', 
            headers: {
                Accept:"application/json", 
                'Content-Type': 'application/json',
            }, 
            body: JSON.stringify(body)
        });
        const data = await response.json();
        const params = new URLSearchParams(data); 
        res.locals.token = params.get('access_token');
        return next(); 
    }
    catch (err) {
        return next({
            log: 'error with oAuth access token',
            message: {err: err}
        });
    }
}

async function getGitHubUser (req, res, next) {
    try {
        const request = await fetch('https://api.github.com/user', {
            headers: {
                Authorization:`bearer ${res.locals.token}`
            }
        });
        const data = await request.json(); 
        res.locals.userData = data; 
        return next();

    }
    catch (err) {
        return next({
            log: 'error with GitHub User',
            message: {err: err}
        });
    }
}

function storeUser (req, res, next) {
  if(!res.locals.userData) return next({
    log: 'user does not exist with github',
    message: {err: 'error at app.get .github/callback'}
  })
  User.find({ username: res.locals.userData.login })
    .then(data => {
      if (!data.length) {
        User.create({ username: res.locals.userData.login, token: res.locals.token })
          .then(data => {
            res.locals.user = data._id
            return next();
          })
          .catch(error => {
            return next({
              log: 'storeUser - Create: Error with storing new user in database',
              message: {err: error}
            })
          })
      }
      else if (res.locals.token !== data[0].token) {
        User.findOneAndUpdate({ username: res.locals.userData.login }, { token: res.locals.token })
          .then(data => {
            res.locals.user = data._id
            return next();
          })
          .catch(error => {
            return next({
              log: 'storeUser - update: Error with updating token for user in database',
              message: {err: error}
            })
          })
      }
      else {
        res.locals.user = data._id
        return next();
      }
    })
    .catch(error => {
      return next({
        log: 'storeUser - Find: Error with finding user in database',
        message: {err: error}
      });
    })
}

module.exports = {
    getAccessToken: getAccessToken, 
    getGitHubUser: getGitHubUser
}