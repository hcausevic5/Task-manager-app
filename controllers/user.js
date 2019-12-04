const User = require('../src/models/user')
const fs = require('fs')
const { sendWellcomeMail, sendCancelationMail } = require('../src/emails/account')

// CREATING NEW USER AND STORING HIM IN DATABASE
var createUser = async (req, res) => {
    try {
        const user = await new User(req.body)
        await user.save()
        const token = await user.generateToken()
        req.session.token = token
        req.session._id = user._id
        sendWellcomeMail(user.email, user.name)
        res.redirect('/login')
    } catch(error) {
        res.render('register', {
            formName: 'Sign up',
            message: 'Already have an account?',
            error: 'Email already taken!'
        })
    }
}
// LOGIN USER, CHECKING PROVIDED EMAIL AND PASSWORD, GENERATING TOKEN
var loginUser = async(req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateToken()
        req.session.token = token
        req.session._id = user._id
        res.redirect('/home')
    } catch(error) {
        res.render('login', {
            formName: 'Sign in',
            message: "Don't have an account?",
            error: 'Email or password incorrect!'
        })
    }
}

// READ CURRENTLY LOGGED IN USER PROFILE
var readUser = async(req, res) => {
    try {
        const user = await User.findById({ _id: req.session._id })
        res.send({ user })
    } catch(error) {
        res.send({ error })
    }
}

// DELETE SESSION
var logoutUser = async(req, res) => {
    try {
        const user = await User.findById(req.session._id)
        user.tokens = user.tokens.filter((token) => {
            return token.token != req.session.token
        })
        await user.save()
        res.send()
    } catch(error) {
        res.status(500).send({ error })
    }
}

// DELETE ALL SESSIONS
var logoutAllUser = async(req, res) => {
    try {
        const user = await User.findById(req.session._id)
        user.tokens = []
        await user.save()
    } catch(error) {
        res.send(500).send({ error })
    }
}

// DELETING ACCOUNT
var deleteUser = async(req, res) => {
    try {
        const user = await User.findById(req.session._id)
        await user.remove()
        sendCancelationMail(user.email, user.name)
        res.redirect('/login')
    } catch(error) {
        res.redirect('/login')
    }
}

// UPDATEING USERS ACCOUNT
var updateUser = async(req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'age', 'email', 'password']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if(!isValidOperation)
        return res.status(400).send({ error: 'Invalid updates provided!' })

    try {
        const user = await User.findById(req.session._id)
        updates.forEach((update) => user[update] = req.body[update])
        await user.save()
        res.redirect('/profile')
    } catch(error) {
        res.status(400).send({ error })
    }
}

// SETTING PROFILE PICTURE
var setPictureUser = async(req, res) => {
    try {
        if(!req.file)
            throw new Error()
        const user = await User.findById(req.session._id)
        if(user.avatar) {
            const oldPicture = user.avatar
            fs.unlinkSync('./public' + oldPicture)
        }
        const imageSrc = req.file.path.split('/')
        user.avatar = '/' + imageSrc[1] + '/' + imageSrc[2]
        await user.save()
        res.redirect('/profile')
    } catch(error) {
        res.redirect('/profile')
    }
}
// DELETING USERS PROFILE PICTURE
var deletePictureUser = async(req, res) => {
    try {
        const user = await User.findById(req.session._id)
        if(user.avatar) {
            const oldPicture = user.avatar
            fs.unlinkSync('./public' + oldPicture)
        }
        user.avatar = undefined
        await user.save()
        res.redirect('/profile')
    } catch(error) {
        res.redirect('/profile')
    }
}
// GETTING USERS PROFILE PICTURE
var getPictureUser = async(req, res) => {
    try {
        const user = await User.findById(req.session._id)
        if(!user || !user.avatar)
            throw new Error('Cannot get picture!')

        res.set('Content-Type', 'image/jpeg')
        res.send(user.avatar)
    } catch(error) {
        res.status(404).send({ error })
    }
}
module.exports = {
    createUser,
    loginUser,
    readUser,
    logoutUser,
    logoutAllUser,
    deleteUser,
    updateUser,
    setPictureUser,
    deletePictureUser,
    getPictureUser
}