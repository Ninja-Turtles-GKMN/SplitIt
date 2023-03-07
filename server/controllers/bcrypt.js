const bcrypt = require('bcrypt');
const saltRounds = 8;

async function hashUsername (req, res, next) {
    try{
        await bcrypt.hash(req.body.username, saltRounds, function(err, hash) {
            console.log(hash); 
            res.locals.hashUN = hash
            // Store hash in your password DB.
        });
        //sending the hashed username through res.locals
        next(); 
    }
    catch {
        return next({log: 'error with username hashing'})
    }
   
}

async function hashPassword (req, res, next) {
    try { 
        await bcrypt.genSalt(saltRounds, function(err, salt) {
            bcrypt.hash(req.body.password, salt, function(err, hash) {
                // Store hash in your password DB.
                res.locals.hashPW = hash
            });
        });
        next();
    } 
    catch {
        return next({log: 'error with password hashing'})
    }
}

function comparePassword (req, res, next) {
    bcrypt.compare(myPlaintextPassword, hash, function(err, result) {
        // result == true
    });
    // bcrypt.compare(someOtherPlaintextPassword, hash, function(err, result) {
    //     // result == false
    // });

}

module.exports = {
    comparePassword: comparePassword, 
    hashPassword: hashPassword, 
    hashUsername: hashUsername
}

