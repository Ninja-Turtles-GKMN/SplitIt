const bcrypt = require('bcrypt');
const saltRounds = 8;

async function hashUsername (req, res, next) {
    try{
        await bcrypt.hash(req.body.username, saltRounds, function(err, hash) {
            console.log('hashed username',hash); 
            res.locals.hashUN = hash
            return next(); 
        });
        //sending the hashed username through res.locals
       
    }
    catch {
        return next({log: 'error with username hashing'})
    }
   
}

async function hashPassword (req, res, next) {
    try { 
        await bcrypt.genSalt(saltRounds, function(err, salt) {
            bcrypt.hash(req.body.password, salt, function(err, hash) {
                res.locals.hashPW = hash
                console.log('hashed password', hash)
                return next();
            });
        });
    } 
    catch {
        return next({log: 'error with password hashing'})
    }
}

module.exports = { 
    hashPassword: hashPassword, 
    hashUsername: hashUsername
}

