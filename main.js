const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
const cors = require('cors')

//conexion a rutas
const authRouter = require('./src/routes/auth.routes')
const reservationRouter = require('./src/routes/reservation.routes')
const adminRouter = require('./src/routes/admin.routes')
const createAdmin = require('./src/utils/createAdmin')


const app = express()
app.use(cors())
const port = process.env.PORT || 7000

app.use(express.json())


//http://localhost:7000/
//rutas
app.use('/auth', authRouter)
app.use('/reservation', reservationRouter)
app.use('/admin', adminRouter)


mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('Conectada a la base de datos')

        createAdmin()

        app.listen(port, '0.0.0.0', () => {
            console.log(`Aplicacion ejecutandose en puerto ${port}`)
        })
        
        
        
    })
    .catch(()=> console.log('NO SE PUDO CONECTAR LA APP CON LA BD'))
