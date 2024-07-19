const prisma = require('../models')

module.exports.getAllEvents = () => prisma.event.findMany({
  where: { deleted: false},
  include: { stadium: { include: {seat_types: true} } }
})

module.exports.getEventById = id => prisma.event.findUnique({
  where: { id: Number(id) },
  include: {
    stadium: {
      include: {
        seat_types: true // Include seat_types in stadium
      }
    }
  }
});

