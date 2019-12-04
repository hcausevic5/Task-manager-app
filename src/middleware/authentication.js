const jwt = require('jsonwebtoken')
const User = require('../models/user')
const bodyParser = require('body-parser')

const authentication = async (req, res, next) => {
        try {
            // Accesing SECRET_TOKEN environment variable to decode token
            const decoded = jwt.verify(req.session.token, process.env.SECRET_TOKEN)
            const user = await User.findOne({ _id: decoded._id })
            if (!user) {
                throw new Error('No user with provided credentials')
            }
            const theOne = user.tokens.find(tok => tok.token == req.session.token)
            if(!theOne)
                throw new Error()
            next()
        } catch (error) {
            res.render('login', {
                formName: 'Sign In',
                message: "Don't have an account?",
                error: 'Failed to authenticate. Sign in first.'
            })
        }
}

module.exports = authentication