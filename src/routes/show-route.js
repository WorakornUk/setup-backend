const express = require('express')
const authenticate = require('../middlewares/authenticate')
const adminticate = require('../middlewares/adminticate')
const showController = require('../controllers/show-controller')

const router = express.Router()

router.get('/', showController.getShows)
router.get('/:id', showController.getShowById)

router.post('/add', ()=>{})
router.delete('/delete/:id', ()=>{})

module.exports = router