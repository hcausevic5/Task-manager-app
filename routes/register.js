var registerCOntroller = require('../controllers/register')

var initRoutes = (app) => {
    app.get('/register', registerCOntroller)
}

module.exports = initRoutes