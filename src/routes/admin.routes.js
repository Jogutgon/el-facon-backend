const { Router } = require('express')
const { verifyJWT } = require('../middlewares/auth.validations')
const { findAllUsers, updateUser } = require('../controllers/admin.controller')


//http://localhost:7000/admin
const adminRouter = Router()

//http://localhost:7000/admin/users
adminRouter.get('/users',
    verifyJWT, 
    findAllUsers 
)

adminRouter.put('/users/:id', 
    verifyJWT,
    updateUser
)

adminRouter.get('/reservations',
    verifyJWT 

)







module.exports = adminRouter