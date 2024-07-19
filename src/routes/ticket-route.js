const express = require('express')
const authenticate = require('../middlewares/authenticate')
const adminticate = require('../middlewares/adminticate')
const ticketController = require('../controllers/ticket-controller')

const router = express.Router()

router.get('/', ticketController.getTickets)
router.get('/:id', ticketController.getTicketsById)
router.post('/create', ticketController.createTicket)

// router.delete('/delete/:id',  homeController.deleteVideo)

module.exports = router