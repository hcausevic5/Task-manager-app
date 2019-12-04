var register = (req, res) => {
    res.render('register', {
        formName: 'Sign up',
        message: 'Already have an account?',
        error: ''
    })
}
module.exports = register