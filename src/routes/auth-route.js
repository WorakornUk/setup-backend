const express = require('express')
const authenticate = require('../middlewares/authenticate')
const authController = require('../controllers/auth-controller')

const router = express.Router()

router.post('/register', authController.register)
router.post('/login', authController.login)
router.get('/profile', authenticate, authController.profile)

module.exports = router