const bcrypt = require('bcrypt');
const saltRounds = 8;

async function compareUP (req, res, next) {
    try{
        console.log('hashed passwords', res.locals.hashPW); 
        console.log('comparing the passwords')
        bcrypt.compare(req.body.username, res.locals.hashUN, function(err, result) {
            console.log(result);
            if (result === true) {
                console.log('correct username');
                res.cookie(req.body.username, res.locals.hashUN, { maxAge: 86400000, httpOnly: true });
                next();
            } 
            next();
        });
    }
    catch {
        return next({log: 'error with comparing hashes'})
    }
}

module.exports = {
    compareUP: compareUP
}