const Task = require('../src/models/task')
const User = require('../src/models/user')

// CREATING NEW TASK
var createTask = async(req, res) => {
    const task = await new Task({
        ...req.body,
        owner: req.session._id
    })
    try {
        await task.save()
        res.redirect('/home')
    } catch(error) {
        res.status(400).send({ error })
    }
}

// GETTING ALL TASKS FOR A USER
var getAllTasks = async(req, res) => {
    const sort = {}

    if(req.query.sortBy) {
        const parts = req.query.sortBy.split(':')
        sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
    }

    try {

        const user = await User.findById({ _id: req.session._id})
        await user.populate({ path: 'tasks'}).execPopulate()
        res.send(user.tasks)
    } catch(error) {
        res.status(500).send({ error })
    }
}

// READ SPECIFIC TASK IDENTIFIED BY PROVIDED ID
const getTask = async(req, res) => {
    try {
        const task = await Task.findOne({ _id: req.params.id, owner: req.user._id})
        if(!task)
            return res.status(404).send({ error: 'There is no task with specified if!'})
        res.send({ task })
    } catch(error) {
        res.status(500).send({ error })
    }
}

const findByNameTask = async(req, res) => {
    try {
        const task = await Task.findOne({ name: req.params.name})
        const updates = Object.keys(req.body)
        updates.forEach((update) => task[update] = req.body[update])
        await task.save()
        res.status(201).send(task)
    } catch(error) {
        res.status(400).send({ error })
    }
}

// DELETE SPECIFIC TASK IDENTIFIED BY PROVIDED ID
const deleteTask = async(req, res) => {
    try {
        const task = await Task.findOneAndDelete({ name: req.params.name })
        if(!task)
            return res.status(404).send()
    } catch(error) {
        res.status(400).send({ error })
    }
}

// UPDATE SPECIFIC TASK IDENTIFIED BY PROVIDED ID
const updateTask = async(req, res) => {
    const updates = Object.keys(req.body)
    const validUpdates = ['name', 'description', 'completed']
    const isValidOperation = updates.every((update) => validUpdates.includes(update))
    if(!isValidOperation)
        return res.status(400).send({ error: 'Invalid update!'})
    try {
        const task = await Task.findOne({ _id: req.params.id, owner: req.user._id})
        if(!task)
            return res.status(404).send({ task })
        updates.forEach((update) => task[update] = req.body[update])
        await task.save()
        res.status(201).send({ task })
    } catch(error) {
        res.status(400).send({ error })
    }
}

module.exports = {
    createTask,
    getAllTasks,
    getTask,
    findByNameTask,
    deleteTask,
    updateTask
}