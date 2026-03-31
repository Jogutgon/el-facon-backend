const bcrypt = require('bcrypt')
const User = require('../models/user.model')
const jwt = require('jsonwebtoken')
const JWT_SECRET = require('../common/constants')

const registerUser = async (req, res) => {
    //campos de donde vienen los datos
    const {
        username,
        password,
        email,
        firstName,
        lastName
    } = req.body

    //encriptar password
    const salt = bcrypt.genSaltSync(8);
    const hashedPassword = bcrypt.hashSync(password, salt);
    console.log( salt, password, hashedPassword)

    //creacion del usuario
    const user = new User({
        username, 
        password: hashedPassword,
        email,
        firstName, 
        lastName
    })

    await user.save()

    res.json({message: "usuario creado"})

    //generar estado
}

const loginUser = async (req, res) => {
    const {
        email,
        password
    } = req.body

    //comprobar si existe el usuario
    const user = await User.findOne({ email })
    if (user === null){
        //estado
        return res.json({ message: "Usuario no encontrado"})
    }

    //comparar password con bcrypt
    const isMatch = bcrypt.compareSync(password, user.password)

    if(!isMatch) {
        res.status(401)
        return res.json({ message: "Sin autorización" })
    }

    const token = jwt.sign({
        id: user._id,
        email: user.email,
        isAdmin: user.isAdmin
    }, JWT_SECRET);

    res.status(200)
    res.json({
        access_token: token
    })
}


module.exports = {
    registerUser,
    loginUser
}
