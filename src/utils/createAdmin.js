const User = require('../models/user.model')

const createAdmin = async () => {
    const exists = await User.findOne( { email: "admin@admin.com" });

    if(!exists) {
        await User.create({ 
            username: "administrator1",
            email: "admin@admin.com",
            password: "12345abcd",
            firstName: "admin",
            lastName: "principal",
            isAdmin: true,
            status: true
        });
        res.json({ message: "Admin creado"})
        console.log("Admin creado")
    }
}

module.exports = createAdmin;