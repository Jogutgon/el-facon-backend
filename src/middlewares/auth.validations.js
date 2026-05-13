const jwt = require('jsonwebtoken')
const JWT_SECRET = require('../common/constants')
const User = require ('../models/user.model')

const verifyJWT = (req, res, next) => {

    // if(!req.headers.authorization)
    //     return res.status(401).json({
    // message: 'Unauthorized'})

    // const authorization = req.headers.authorization
    // const token = authorization.split(" ")[1]

    // jwt.verify(token, JWT_SECRET,(err, decoded) => {
    //    if(err) {
    //     return res.status(401).json({message: 'Token invalido'});
    //    } 
    //    req.user = decoded;
    //    next();
    // })

    if(!req.headers.authorization){
        return res.status(401).json({
        message: 'Unauthorized'
        });
    }

    const authorization = req.headers.authorization;
    const token = authorization.split(" ")[1];

    jwt.verify(token, JWT_SECRET, async (err, decoded) => {
       if(err) {
        return res.status(401).json({
            message: 'Token invalido'
            });
       } 
       try {
        
        const user = await User.findById(decoded.id)
            .select('-password');

        if (!user) {
            return res.status(404).json({
                message: 'Usuario no encontrado'
            });
        }

        req.user = user;
        next();
       } catch (error) {
            return res.status(500).json({
                message: 'Error verificando usuario'
            });
       }
    });

}


module.exports = {
    verifyJWT
}