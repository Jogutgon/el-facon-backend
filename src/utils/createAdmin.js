const User = require('../models/user.model')

const createAdmin = async () => {
    const exists = await User.findOne( { email: "admin@admin.com" });

    if(!exists) {
        await User.create({ 
            email: "admin@admin.com",
            password: "12345abcd",
            isAdmin: true
        });
        res.json({ message: "Admin creado"})
    }
}

module.exports = createAdmin;