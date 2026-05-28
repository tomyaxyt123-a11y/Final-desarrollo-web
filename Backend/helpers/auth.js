'use strict';

let jwt = require('jwt-simple');
let moment = require('moment');
let secret = 'asdayiuttyi34578.,,qw';

function createToken(usuario){
    let payload = {
        sub: usuario._id,
        email: usuario.email,
        iat: moment().unix(),
        exp: moment().add(20, 'minutes').unix()
    };
    return jwt.encode(payload, secret);
}

function validateToken(req, res, next){
    try{
        let token = req.headers.authorization.replace('Bearer ', '');
        let payload = jwt.decode(token, secret);
        req.header.userId = payload.sub; // Recordar el Id del usuario que logueo
        req.userId = payload.sub;
        next();
    }
    catch(ex){
        res.status(401).send({ message: 'Token inválido'});
    }
}

module.exports = {createToken,validateToken };
