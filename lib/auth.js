const passport = require('./passport')

class Auth {
    static authentication = passport.authenticate('jwt', {
        session: false
    })
}

module.exports = Auth