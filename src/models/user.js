const mongoose = require('mongoose')
const validator = require('validator')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const modelConstants = require('../constants/models')
const stringConstants = require('../constants/strings')
const Task = require('./task')

// CREATING SCHEMA FOR USER WITH ATTRIBUTES: NAME, AGE, EMAIL, PASSWORD, TOKENS AND AVATAR
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    age: {
        type: Number,
        validate(value) {
            if (value < 0) {
                throw new Error('Age is invalid!')
            }
        }
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value))
                throw new Error('Email is invalid!')
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 7,
        validate(value) {
            if (value.toLowerCase().includes(stringConstants.PASSWORD)) // PASSWORD CAN BE FIND IN ../constants/strings
                throw new Error('Password is invalid!')
        }
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
    avatar: {
        type: String
    }
}, { timestamps: true })

// CREATING VIRTUAL CONNECTION BETWEEN 2 COLLECTIONS TASKS AND USERS
// THIS WILL GIVE US ALL TASKS THAT PARTICULAR USER HAS CREATED
userSchema.virtual('tasks', {
    ref: 'Task',
    localField: '_id',
    foreignField: 'owner'
})

// HASHING USERS PASSWORD BEFORE SAVING IT IN DATABASE
userSchema.pre('save', async function (next) {
    const user = this
    if (user.isModified(stringConstants.PASSWORD)) {
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
})

// FUNCTION THAT IS DELETING PASSWORD, TOKENS AND AVATAR SO THEY CANT BE SEEN IN DATABASE
userSchema.methods.toJSON = function () {
    const user = this
    const userObject = user.toObject()
    delete userObject.password
    delete userObject.tokens
    return userObject
}

// IMPLEMENTING FUNCTION THAT IS USED ON USER MODEL, TO FIND SPECIFIC USER IN DATABASE, WITH EMAIL AND PASSWORD
// .statics FUNCTIONS WORK WITH MODEL AND .methods WORK WITH ONE INSTANCE
userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email })
    if (!user)
        throw new Error('Unable to login!')
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch)
        throw new Error('Unable to login!')
    return user
}

// GENERATING UNIQUE JSONWEBTOKEN FOR USER, THAT WILL BE USED FOR AUTHENTICATION
userSchema.methods.generateToken = async function () {
    const user = this
    const token = jwt.sign({ _id: user._id.toString() }, process.env.SECRET_TOKEN)
    user.tokens = user.tokens.concat({ token })
    await user.save()
    return token
}

// AFTER USER IS DELETED FROM DATABASE, EVERY TASK THAT HE HAS CREATED WILL BE DELETED TOO,
// BECAUSE HE CANT LONGER SEE THEM AND EVERYONE ELSE WASNT ABLE TO SEE THEM ANYWAY
userSchema.pre('remove', async function (next) {
    const user = this
    await Task.deleteMany({ owner: user._id })
    next()
})

const User = mongoose.model(modelConstants.USER, userSchema)
module.exports = User