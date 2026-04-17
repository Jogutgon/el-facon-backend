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


const updateUser = async (req, res) => {
    try {
    
        const updateUser = await User.findByIdAndUpdate(
            req.params.id, 
            {
            firstName: req.body.firstName, 
            lastName: req.body.lastName,
            email: req.body.email,
        },
            {new: true}).select('-password')

        if(!updateUser) {
            return res.status(400).json({
                message: "USUARIO NO ENCONTRADO"
            })
        }

        res.status(200)
        res.json({message: "USUARIO ACTUALIZADO", data: updateUser})

    } catch (error) {
        res.status(500).json({
            message: "Error actualizar usuario"
        })
    }
}

const suspendUser = async (req, res) => {
    
    try {
        const suspend = await User.findByIdAndUpdate(
            req.params.id,
            {
                status: false
            }
        )

        if(suspend === null) {
            res.status(400).json({message: "USUARIO NO ENCONTRADO"})
        }
    } catch (error) {
        res.status(500).json({
            message: "Error al suspender usuario"
        })
    }
}



module.exports = {
    findAllUsers,
    updateUser,
    suspendUser
}


