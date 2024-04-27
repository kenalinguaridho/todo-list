const express = require('express')
const app = express()
require('dotenv').config()
const PORT = process.env.PORT || 3030
const morgan = require('morgan')
const userRouter = require('./routes/userRoute.js')

app.use(express.json())
app.use(morgan('dev'))

app.use('/api', userRouter)

app.use((err, req, res, next) => {
    res.status(500).json({
        status: 'failed',
        errors: err.message
    })
})

app.use((req, res, next) => {
    res.status(404).json({
        status:'failed',
        errors:'API endpoint not found'
    })
})

app.listen(PORT, () => {
    console.log(`Application running on port:${PORT}`);
})