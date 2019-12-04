var allTaskControllers = require('../controllers/task')
var authentication = require('../src/middleware/authentication')

var initRoutes = (app) => {
    app.post('/tasks', authentication, allTaskControllers.createTask) // Provjerenoradi
    app.get('/tasks', authentication, allTaskControllers.getAllTasks) // Provjerenoradi
    app.get('/tasks/:id', authentication, allTaskControllers.getTask) // ne treba u frontendu
    app.patch('/tasks/:name', authentication, allTaskControllers.findByNameTask) // Provjereno radi
    app.delete('/tasks/:name', authentication, allTaskControllers.deleteTask) //radi
    //app.delete('/tasks/:id', authentication, allTaskControllers.deleteTask)
    app.patch('/tasks/:id', authentication, allTaskControllers.updateTask)
}

module.exports = initRoutes