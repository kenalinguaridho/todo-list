const { Op } = require('sequelize')
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
                status: 'Unfinish'
            }

            const list = await Activity.create(payload)

            return res.status(200).json({
                status: 'success',
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
            const lists = await Activity.findAll({
                where: {
                    userId: req.user.id
                }
            })
            return res.status(200).json({
                status: 'success',
                payload: lists
            })
        } catch (error) {
            return res.status(400).json({ 
                status: 'failed',
                message: 'failed while fetching data'
            })
        }
    }

    static updateToDoListStatus = async (req, res) => {
        try {
            const listUpdate = await Activity.update({
                status: 'Finish'
            }, {
                where: {
                    [Op.and]: [{id: req.params.id}, {userId: req.user.id}]
                }
            })

            if (listUpdate[0] == 0) {
                return res.status(400).json({
                    status: 'failed',
                    message: 'no row affected'
                })
            }
            return res.status(200).json({
                status: 'success',
                message: 'activity status has been updated'
            })
        } catch (error) {
            return res.status(500).json({
                status: 'failed',
                message: 'error while update activity status'
            })
        }
    }

    static deleteToDoList = async (req, res) => {
        try {
            const deleteActivity = await Activity.destroy({
                where: {
                    [Op.and]: [{id: req.params.id}, {userId: req.user.id}]
                }
            })

            console.log(deleteActivity);

            if (deleteActivity == 0) {
                return res.status(400).json({
                    status: 'failed',
                    message: 'no activity was deleted'
                })
            }

            return res.status(200).json({
                status: 'success',
                message: 'activity has been deleted'
            })

        } catch (error) {
            
            return res.status(500).json({
                status: 'failed',
                message: 'error while deleting activity'
            })

        }
    }
}

module.exports = { ToDoListController }