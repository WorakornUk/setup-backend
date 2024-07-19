const upload = require('../middlewares/upload')
const uploadService = require('../services/upload-service')

const prisma = require('../models')
const createError = require('../utils/create-error')



module.exports.getTickets = async (req, res, next) => {
  try {
    const tickets = await prisma.ticket.findMany({
      include: {
        event: {
          include: {
            stadium: {
              include: {
                seat_types: true
              }
            }
          }
        }
      }
    })
    res.json(tickets)

  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch tickets'})
  }
}
module.exports.getTicketsById = async (req, res, next) => {
  try {
    const { id } = req.params
    const ticket = await prisma.ticket.findUnique({
      where : { id: Number(id) },
      include: {
        event: {
          include: {
            stadium: {
              include: {
                seat_types: true
              }
            }
          }
        }
      }
    })

    res.json(ticket)

  } catch (err) {
    res.status(404).json({ message: "Event not found"})
    
  }
}

module.exports.createTicket = async (req, res, next) => {
    try {
      let { event_id, price } = req.body;
      console.log(event_id, price)
      if( !(event_id && price) ) createError('not enough information', 400)
      
      const newTicket = await prisma.ticket.create({
        data: {
          event_id : Number(event_id),
          price,
        },
      });
  
      res.status(201).json(newTicket);
    } catch (err) {
      next(err)
    }
  }

module.exports.deleteVideo = async (req, res, next) => {
  try {
    const { id } = req.params

    //check existent
    const video = await prisma.video.findUnique({ where: {id:Number(id)} })
    if( !video ) createError('Video not found', 404)

    await prisma.video.delete({ where: { id:Number(id) } })
    
    res.status(200).json({ message: 'Video deleted successfully'})
  } catch (err) {
    next(err)    
  }
}
