const express = require('express')
const authenticate = require('../middlewares/authenticate')
const adminticate = require('../middlewares/adminticate')
const homeController = require('../controllers/home-controller')

const router = express.Router()

router.get('/', homeController.getVideos)
router.post('/add', authenticate, adminticate, homeController.addVideo)
router.delete('/delete/:id',  homeController.deleteVideo)

router.post('/upload', authenticate, adminticate, homeController.uploadSomething); 

module.exports = router