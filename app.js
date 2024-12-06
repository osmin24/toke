const express = require('express')
const app = express()
const dotenv = require('dotenv').config()
//const cors = require('cors')
const database = require('./configuration/database')
const https = require('https')

const usuario = require('./routers/usuario')

app.set('port',process.env.PORT || 3000)
app.use(express.json())
app.use(express.urlencoded({extended:'true'}))
//app.use(cors({origin:'*'}))

app.use('/usuario',usuario)




module.exports = app