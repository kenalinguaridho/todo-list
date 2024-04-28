const
    { Activity, User } = require('../models')

class ToDoListController {
    static create = async (req, res) => {

        try {

            let { activity, description } = req.body

            const payload = {
                userId: req.user.id,
                activity: activity,
                description: description,
                status: 'On Progress'
            }

            const list = await Activity.create(payload)

            return res.status(200).json({
                status: 'success',
                message: 'activity created',
                payload: list
            })
            
        } catch (error) {
            return res.status(400).json({
                statuc: 'failed',
                message: error.errors[0].message ?? 'failed when create activity'
            })
        }

    }

    static getToDoList = async (req, res) => {
        try {
            const lists = await Activity.findAll()
            return res.status(200).json("ok")
        } catch (error) {
            return res.status(400).json({ status: 'failed' })
        }
    }

    static updateToDoListStatus = async (req, res) => {
        try {
            
        } catch (error) {
            
        }
    }

    static deleteToDoList = async (req, res) => {
        try {
            
        } catch (error) {
            
        }
    }
}

module.exports = { ToDoListController }