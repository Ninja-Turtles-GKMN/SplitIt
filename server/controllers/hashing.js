const bcrypt = require('bcrypt');
const saltRounds = 8;

async function hashUsername (req, res, next) {
    console.log('hasing username', req.body);
    try{
        await bcrypt.hash(req.body.username, saltRounds, function(err, hash) {
            if (err) throw {log: err, status: 400}
            console.log('hashed username',hash); 
            res.locals.hashUN = hash
            return next(); 
        });
    }
    catch (e){
        return next(e);
    }
   
}

async function hashPassword (req, res, next) {
    try { 
        await bcrypt.genSalt(saltRounds, function(err, salt) {
            bcrypt.hash(req.body.password, salt, function(err, hash) {
                if (err) throw {log: err, status: 400}
                res.locals.hashPW = hash
                console.log('hashed password', hash)
                return next();
            });
        });
    } 
    catch (e){
        return next(e);
    }
}

module.exports = { 
    hashPassword: hashPassword, 
    hashUsername: hashUsername
}

