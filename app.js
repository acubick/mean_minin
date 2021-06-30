const express = require('express')
const authRoutes = require('./routes/auth')
const app = express()


//  localhost:5000/api/auth/login
app.use('/api/auth', authRoutes)



// app.get('/', (req, res) => {
//   res.status(200).json({
//                          msg: 'Working'
//                        })
// })



module.exports = app
