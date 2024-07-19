const express = require('express')
const authenticate = require('../middlewares/authenticate')
const adminticate = require('../middlewares/adminticate')
const wrestlerController = require('../controllers/wrestler-controller')

const router = express.Router()

router.get('/', wrestlerController.getWrestlers)
router.post('/add', authenticate, adminticate, wrestlerController.addWrestler)
router.delete('/delete/:id', authenticate, adminticate,  wrestlerController.deleteWrestler)

module.exports = router