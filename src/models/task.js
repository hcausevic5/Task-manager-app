const mongoose = require('mongoose')
const validator = require('validator')
require('../constants/models')
const modelConstants = require('../constants/models')

// CREATING TASK SCHEMA WITH 3 ATTRIBUTES: DESCRIPTION, COMPLETED AND OWNER
// 2ND PARAMETER, TIMESTAMPS: TRUE, GIVE US TWO NEW ATTRIBUTES CREATEDAT AND UPDATEDAT,
// SO WE DONT HAVE TO MANUALY SET THAT UP
const taskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    completed: {
        type: String,
        default: false
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
}, { timestamps: true })
const Task = new mongoose.model(modelConstants.TASK, taskSchema)

module.exports = Task