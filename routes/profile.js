var profileController = require('../controllers/profile')
var authentication = require('../src/middleware/authentication')

var initRoutes = (app) => {
    app.get('/profile', authentication, profileController)
}

module.exports = initRoutes