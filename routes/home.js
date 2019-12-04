var homeController = require('../controllers/home')
var authentication = require('../src/middleware/authentication')

var initRoutes = (app) => {
    app.get('/home', authentication, homeController)
}

module.exports = initRoutes