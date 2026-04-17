const Reservation = require('../models/reservation.model')
const User = require('../models/user.model')


//encontrar todos los usuarios

const findAllUsers = async (req, res) => {
    try {

        const {
            firstName,
            lastName
        } = req.query

        const filter = { isAdmin: false };

        if(firstName) {
            filter.firstName = { $regex: new RegExp(firstName, 'i') }
        }

        if(lastName) {
            filter.lastName = { $regex: new RegExp(lastName, 'i')}
        }

        const users = await User.find(filter).select('-password')

        return res.status(200).json({message: "Find all users", data: users})
    
    } catch (error) {
        res.status(500).json({
            message: "Error buscando usuarios"
        })
    }
}



module.exports = {
    findAllUsers
}


