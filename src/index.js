// REQUIREING MODULES
const express = require('express')
const bodyParser = require('body-parser')
const hbs = require('hbs')
const path = require('path')
require('./db/mongoose')
const session = require('express-session')

// APP INSTANCE
const app = express()

// SESSION MIDDLEWARE
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    maxAge: 60000
}));

// SETTING PUBLIC FOLDER AS STATIC
app.use(express.static(path.join(__dirname, '../public')))

// SETTING HANDLEBARS AS THE DEFAULT VIEW ENGINE 
app.set('views', path.join(__dirname, '../templates/views'))
app.set('view engine', 'hbs')
hbs.registerPartials(path.join(__dirname, '../templates/partials'))

// BODY PARSER
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

// INITIATING ROUTES
const userRoutes = require('../routes/user')
userRoutes(app)
const taskRoutes = require('../routes/task')
taskRoutes(app)
const loginRoute = require('../routes/login')
loginRoute(app)
const registerRoute = require('../routes/register')
registerRoute(app)
const homeRoute = require('../routes/home')
homeRoute(app)
const profileRoute = require('../routes/profile')
profileRoute(app)


// DEFINING PORT 
const port = process.env.PORT || 8080
app.listen(port, () => {
    console.log(`Server is up and listening on port ${port}`)
})