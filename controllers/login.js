var login = (req, res) => {
    res.render('login', {
        formName: 'Sign in',
        message: "Don't have an account?",
        error: ''
    })
}
module.exports = login