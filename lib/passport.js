const
    passport = require('passport'),
    { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt'),
    { User } = require('../models')

require('dotenv').config()

const opt = {
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: process.env.SECRET_KEY
}

passport.use(new JwtStrategy, (opt, (payload, done) => {
    User.findByPk(payload.id)
        .then((result) => {
            done(null, result)
        }).catch((err) => {
            done(err, null)
        });
}))

module.exports = passport