const express = require('express')
const mongoose = require('mongoose')

const app = express()

const port = 7000

//http://localhost:7000/

app.get('/', (req, res) => {
    res.send('Hello world!')
})

mongoose.connect('mongodb+srv://josefina:josefina@clustercero.ea9ggib.mongodb.net/')
    .then(() => {
        console.log('Conectada a la base de datos')
        app.listen(port, () => {
            console.log(`Aplicacion ejecutandose en puerto ${port}`)
        })
    })
    .catch(()=> console.log('NO SE PUDO CONECTAR LA APP CON LA BD'))
