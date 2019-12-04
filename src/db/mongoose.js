const mongoose = require('mongoose')
// require dotenv package for manipulating with environment variables, which we want to hide from public
require('dotenv').config()
// Connecting on database
mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
})


