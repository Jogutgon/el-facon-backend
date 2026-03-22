const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()

const app = express()

const port = 7000


const User = require('./src/models/user.model')

//http://localhost:7000/

// app.get('/', (req, res) => {
//     res.send('Hello world!')
// })

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('Conectada a la base de datos')
        app.listen(port, () => {
            console.log(`Aplicacion ejecutandose en puerto ${port}`)
        })
    })
    .catch(()=> console.log('NO SE PUDO CONECTAR LA APP CON LA BD'))
