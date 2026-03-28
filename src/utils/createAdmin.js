const User = require('../models/user.model')
const bcrypt = require('bcrypt')

const createAdmin = async () => {
    const exists = await User.findOne( { email: "admin@admin.com" });

    const salt = bcrypt.genSaltSync(8);
    const hashedPassword = bcrypt.hashSync("12345abcd", salt);

    if(!exists) {
        await User.create({ 
            username: "administrator1",
            email: "admin@admin.com",
            password: hashedPassword,
            firstName: "admin",
            lastName: "principal",
            isAdmin: true,
            status: true
        });
        
        console.log("Admin creado")
    }
}

module.exports = createAdmin;