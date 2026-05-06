const { Router } = require('express')
const { registerUser, loginUser } = require('../controllers/auth.controller')
const { expressValidations } = require('../middlewares/common.validations')
const { body } = require('express-validator')


//http://localhost:7000/auth
const authRouter = Router()

authRouter.post('/register', 
    [
        body('username')
            .trim()
            .notEmpty().withMessage('Debe agregar nombre de usuario')
            .isLength({ min: 8 }).withMessage('Debe tener al menos 8 caracteres'),

        body('firstName')
            .trim()
            .notEmpty().withMessage('Debe agregar un nombre')
            .isLength({ min: 3 }).withMessage('Debe al menos tener 3 caracteres'),

        body('lastName')
            .trim()
            .notEmpty().withMessage('Debe agregar un apellido')
            .isLength({ min: 3 }).withMessage('Debe tener al menos 3 caracteres'),

        body('email')
            .trim()
            .notEmpty().withMessage('Debe agregar un email')
            .isEmail().withMessage('Debe ser formato válido (ej: text@text.com)')
            .normalizeEmail(),

        body('password')
            .trim()
            .notEmpty().withMessage('Debe agregar una contraseña')
            .isLength({ min: 8 }).withMessage('Debe tener al menos 8 caracteres')
    ], 
    expressValidations,
    registerUser
)

authRouter.post('/login', 
    [
        body('email')
            .trim()
            .notEmpty().withMessage('Debe agregar un email')
            .isEmail().withMessage('Debe ser formato váildo (ej: text@text.com)')
            .normalizeEmail(),
        
        body('password')
            .trim()
            .notEmpty().withMessage('Debe agregar una contraseña')
    ],
    expressValidations,
    loginUser
 )

module.exports = authRouter