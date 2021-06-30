const express = require('express')


const controller = require('../conrollers/auth')

const router  = express.Router()

router.get('/login', controller.login)
router.post('/register', controller.register)

module.exports = router
