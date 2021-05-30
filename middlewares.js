const jwt = require('jsonwebtoken');
const User = require('./db/models/user.model');

class Middlewares {
    authenticate(req, res, next) {
        const token = req.cookies.JWT;

        if(token === null) return res.sendStatus(401);

        jwt.verify(token, process.env.TOKEN_SECRET, async (err, user) => {
            if(err) return res.sendStatus(403);
    
            req.user = user;
            next();
        });
    }
}

module.exports = new Middlewares;