const Reservation = require('../models/reservation.model')
const User = require('../models/user.model')


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
        return res.status(200).json({
            message: "Usuarios encontrados", 
            data: users
        })
    
    } catch (error) {
        res.status(500).json({
            message: "Error al buscar usuarios"
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
            username: req.body.username
        },
            {new: true}).select('-password')

        if(!updateUser) {
            return res.status(404).json({
                message: "USUARIO NO ENCONTRADO"
            })
        }

        return res.status(200).json({
            message: "Usuario actualizado", 
            data: updateUser
        });

    } catch (error) {
        res.status(500).json({
            message: "Error al actualizar usuario"
        })
    }
}

const statusUser = async (req, res) => {
    
    try {
        const { status } = req.body

        if(typeof status !== 'boolean'){
            res.status(400)
            return res.json({message: "El campo status debe ser true o false"})
        }

        const updateStatus = await User.findByIdAndUpdate(
            req.params.id,
            { status },
            {new: true}
        ).select('-password')

        if(updateStatus === null) {
            return res.status(404).json({
                message: "Usuario no encontrado"})
        }

        return res.status(200).json({
            message: `Usuario ${status ? 'activado' : 'suspendido'}`, 
            data: updateStatus
        });
       
    } catch (error) {
        res.status(500).json({
            message: "Error al suspender usuario"
        })
    }
}


const deleteUserById = async (req, res) => {
    try {
        const { id } = req.params

        const deletedUser = await User.findByIdAndDelete(id).select('-password')

        if (deletedUser === null) {
            return res.status(404).json({
                message: "Usuario no encontrado"
            })
        } 

        return res.status(200).json({
            message: "Usuario eliminado"
        })

    } catch (error) {
        res.status(500).json({message: "Error al eliminar el usuario"})
    }
}



module.exports = {
    findAllUsers,
    updateUser,
    statusUser,
    deleteUserById
}


