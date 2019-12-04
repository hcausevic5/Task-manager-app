const User = require('../src/models/user')

var profile = async (req, res) => {
    const user = await User.findById(req.session._id)
    res.render('profile', {
        appName: 'My profile',
        imagePath: user.avatar,
        userData: user
    })
}
module.exports = profile