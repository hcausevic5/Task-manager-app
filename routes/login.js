var loginController = require('../controllers/login')

var initRoutes = (app) => {
    app.get('/', loginController)
    app.get('/login', loginController)
}

module.exports = initRoutes