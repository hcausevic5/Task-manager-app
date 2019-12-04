var home = (req, res) => {
    res.render('home', {
        appName: 'Task manager'
    })
}
module.exports = home