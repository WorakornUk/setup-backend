require('dotenv').config()
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')

const errorHandler = require('./middlewares/error-handling')
const authRoute = require('./routes/auth-route')
const homeRoute = require('./routes/home-route')
const wrestlerRoute = require('./routes/wrestler-route')
const showRoute = require('./routes/show-route')
const ticketRoute = require('./routes/ticket-route')

const app = express()

app.use(cors())
app.use(morgan('dev'))
app.use(express.json())

app.use('/auth', authRoute)
app.use('/', homeRoute)
app.use('/wrestlers', wrestlerRoute)
app.use('/shows', showRoute)

app.use('/ticket', ticketRoute)


app.use(errorHandler)

let port = process.env.PORT || 8000
app.listen(port, () => console.log('Server running on', port))