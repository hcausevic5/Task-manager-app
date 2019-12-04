// SETTING UP MULTER FOR PICTURES SAVE
const multer = require('multer')
const path = require('path')
const crypto = require('crypto')


var storage = multer.diskStorage({
    filename: (req, file, cb) => {
        let customFileName = crypto.randomBytes(18).toString('hex')
        let fileExtension = path.extname(file.originalname).split('.')[1]
        cb(null, customFileName + '.' + fileExtension)
    },
    destination: (req, file, cb) => {
        cb(null, './public/uploads')
    }
})

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1000000
    },
    fileFilter: fileFilter = (req, file, cb) => {
        if(!file.originalname.match(/\.(jpg|jpeg|png)$/))
        return cb('Prilozeni fajl nije slika', false)
     cb(undefined, true)
    }
})


var allUserControllers = require('../controllers/user')
var authentication = require('../src/middleware/authentication')
var initRoutes = (app) => {
    app.post('/users', allUserControllers.createUser) // radi
    app.post('/login', allUserControllers.loginUser) // radi
    app.get('/users/me', authentication, allUserControllers.readUser) //radi 
    app.post('/users/logout', authentication, allUserControllers.logoutUser) // radi
    app.post('/users/logoutAll', authentication, allUserControllers.logoutAllUser) // radi
    app.delete('/users/me', authentication, allUserControllers.deleteUser) //radi
    app.patch('/users/me', authentication, allUserControllers.updateUser) 
    app.post('/users/me/avatar', authentication, upload.single('avatar'), allUserControllers.setPictureUser) // radi
    app.delete('/users/me/avatar', authentication, allUserControllers.deletePictureUser) //radi
    app.get('/users/me/avatar', authentication, allUserControllers.getPictureUser) //radi
}

module.exports = initRoutes