const express         = require('express')
const bodyParser = require('body-parser')
const authRoutes      = require('./routes/auth')
const analyticsRoutes = require('./routes/analytics')
const categoryRoutes  = require('./routes/category')
const orderRoutes     = require('./routes/order')
const positionRoutes  = require('./routes/position')
const app             = express()

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

//  localhost:5000/api/auth/login
app.use('/api/auth', authRoutes)
app.use('/api/analytics', analyticsRoutes)
app.use('/api/category', categoryRoutes)
app.use('/api/order', orderRoutes)
app.use('/api/position', positionRoutes)


// app.get('/', (req, res) => {
//   res.status(200).json({
//                          msg: 'Working'
//                        })
// })


module.exports = app
