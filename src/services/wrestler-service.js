const prisma = require('../models')

// module.exports.getWrestlers = data => prisma.wrestler.create({ data })

module.exports.fetchWrestlers = () => prisma.wrestler.findMany()
module.exports.findWrestler = id => prisma.wrestler.findUnique({ where: {id:Number(id)}})

module.exports.createWrestlers = data => prisma.wrestler.create({ data })

module.exports.updateWrestlerById = (id, data) => {
  prisma.wrestler.update({ where: {id: Number(id)} }, data)
}

module.exports.hardDeleteWrestlerById = (id) => prisma.wrestler.delete({ where: {id:Number(id)} })
module.exports.softDeleteWrestlerById = (id) => prisma.wrestler.update({ where: {id:Number(id)}, data: {deleted:true} })
