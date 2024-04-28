const
    { Op } = require('sequelize'),
    { User } = require('../models'),
    { compareSync } = require('bcryptjs'),
    jwt = require('jsonwebtoken')

class UserController {
    static register = async (req, res) => {
        try {

            let { firstName, lastName, email, phone, pin, rePin } = req.body

            const payload = {
                firstName: firstName,
                lastName: lastName,
                email: email,
                phone: phone,
                pin: pin,
                rePin: rePin
            }

            if (payload.pin.length != 6) {
                return res.status(400).json({
                    status: 'failed',
                    message: 'pin must be 6 char length'
                })
            }

            if (rePin !== pin) {
                return res.status(400).json({
                    status: 'failed',
                    message: `pin isn't consistent`
                })
            }

            await User.create(payload)

            return res.status(201).json({
                status: 'success',
                message: 'user register successful'
            })

        } catch (error) {

            return res.status(400).json({
                status: 'failed',
                message: error.errors[0].message || 'failed while creating data'
            })

        }
    }

    static login = async (req, res) => {
        try {

            let { user, pin } = req.body

            const payload = {
                user: user ?? '',
                pin: pin ?? ''
            }

            payload.user = payload.user.toLowerCase()

            const userLogin = await User.findOne({
                where: {
                    [Op.or]: [{ email: payload.user }, { phone: payload.user }]
                },
                attributes: ['id', 'pin']
            })

            if (!userLogin) {
                return res.status(400).json({
                    status: 'failed',
                    message: 'user not found'
                })
            }

            const comparePassword = compareSync(payload.pin, userLogin.dataValues.pin)

            if (!comparePassword) {
                return res.status(400).json({
                    status: 'failed',
                    message: `password didn't match`
                })
            }

            const dataLogin = {
                id: userLogin.dataValues.id,
            }

            const accessToken = jwt.sign(dataLogin, process.env.SECRET_KEY)

            dataLogin.accessToken = accessToken

            return res.status(200).json({
                status: 'success',
                message: 'login success',
                payload: dataLogin
            })

        } catch (error) {
            return res.status(500).json({
                status: "failed",
                message: error
            })
        }

    }
}

module.exports = { UserController }