const jwt = require('jsonwebtoken')
const JWT_SECRET = require('../common/constants')

const verifyJWT = (req, res, next) => {

    if(!req.headers.authorization)
        return res.json({message: 'Unauthorized'})

    const authorization = req.headers.authorization
    const token = authorization.split(" ")[1]

    jwt.verify(token, JWT_SECRET,(err, decoded) => {
       if(err) {
        return res.status(401).json({message: 'Token invalido'});
       } 
       req.user = decoded;
       next();
    })

}


module.exports = {
    verifyJWT
}