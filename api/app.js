'use strict'

require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = process.env.PORT || 3000
const cors = require('cors')

// just for testing
app.use(cors({origin: '*'}))

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

require('./routes')(app)

app.listen(port)

console.log(`listening on port ${port}`)