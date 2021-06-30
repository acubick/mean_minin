const express         = require('express')
const mongoose        = require('mongoose')
const bodyParser      = require('body-parser')
const authRoutes      = require('./routes/auth')
const analyticsRoutes = require('./routes/analytics')
const categoryRoutes  = require('./routes/category')
const orderRoutes     = require('./routes/order')
const positionRoutes  = require('./routes/position')
const app             = express()
const keys = require('./config/keys')

mongoose.connect(keys.mongoURI)
        .then(()=> console.log("MongoDb connected." ))
        .catch(err => console.log(err))

app.use(require('morgan')('dev'))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(require('cors')())

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
