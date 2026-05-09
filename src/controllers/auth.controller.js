const bcrypt = require('bcrypt')
const User = require('../models/user.model')
const jwt = require('jsonwebtoken')
const JWT_SECRET = require('../common/constants')

const registerUser = async (req, res) => {
    try {
    const {
        username,
        password,
        email,
        firstName,
        lastName
    } = req.body

    const salt = bcrypt.genSaltSync(8);
    const hashedPassword = bcrypt.hashSync(password, salt);
    console.log( salt, password, hashedPassword)

    const user = new User({
        username, 
        password: hashedPassword,
        email,
        firstName, 
        lastName
    })

    await user.save()
    return res.status(201).json({message: "Usuario creado"})
    } catch (error) {
        return res.status(500).json({
            message: "Error al registrar usuario"
        });
    }
}

const loginUser = async (req, res) => {
   try {
     const {
        email,
        password
    } = req.body

    const user = await User.findOne({ email });
    if (!user){
        return res.status(401).json({ 
            message: "Credenciales inválidas"
        });
    }

    const isMatch = bcrypt.compareSync(password, user.password);

    if(!isMatch) {
        return res.status(401).json({ 
            message: "Credenciales inválidas"
        });        
    }

    const token = jwt.sign({
        id: user._id,
        email: user.email,
        isAdmin: user.isAdmin
    }, JWT_SECRET);

    res.status(200).json({
        access_token: token
    });
   } catch (error) {
    return res.status(500).json({
        message: "Error al iniciar sesión"
    });
   }
}


module.exports = {
    registerUser,
    loginUser
}
