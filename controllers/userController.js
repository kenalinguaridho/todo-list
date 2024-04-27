const { User } = require('../models')

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
                message: 'failed while creating data'
            })

        }
    }

    static login = async (req, res) => {

    }
}

module.exports = { UserController }