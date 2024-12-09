const express = require('express')
const app = express()
const dotenv = require('dotenv').config()
const cors = require('cors')
const database = require('./configuration/database')

const usuario = require('./routers/usuario')
const estadoequipo = require('./routers/estadoequipo')
const marca = require('./routers/marca')
const tipoequipo = require('./routers/tipoequipo')
const autenticados = require('./routers/autenticacion')

app.set('port',process.env.PORT || 3000)
app.use(express.json())
app.use(express.urlencoded({extended:'true'}))
app.use(cors({origin:'*'}))

app.use('/usuario',usuario)
app.use('/estadoequipo',estadoequipo)
app.use('/marca',marca)
app.use('/tipoequipo',tipoequipo)
app.use('/autenticado',autenticados)



module.exports = app