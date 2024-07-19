const prisma = require('../models')

module.exports.createUser = data => prisma.user.create({ data })

module.exports.findUserByEmail = email => prisma.user.findFirst({ where: {email} })
module.exports.findUserById = userId => prisma.user.findUnique({ where: {id:userId}})

module.exports.updateUserById = (userId, data) => { 
  prisma.user.update({ where: {id:userId} }, data)
}
