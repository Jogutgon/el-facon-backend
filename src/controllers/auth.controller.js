const bcrypt = require('bcrypt')
const User = require('../models/user.model')

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

    //generar estado
}

const loginUser = async (req, res) => {
    const {
        username,
        password
    } = req.body

    //comprobar si existe el usuario
    const user = await User.findOne({ username })
    if (user === null){
        //estado
        return res.json({ message: "Usuario no encontrado"})
    }

    //comparar password con bcrypt
    const isMatch = bcrypt.compareSync(password, user.password)

    if(!isMatch) {
        //estado
        return res.json({ message: "Sin autorización" })
    }
}


module.exports = {
    registerUser
}
