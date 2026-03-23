const bcrypt = require('bcrypt')
const User = require('../models/user.model')

const register = async (req, res) => {
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


module.exports = {
    register
}