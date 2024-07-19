const jwtService = require('../services/jwt-service')
const userService = require('../services/user-services')
const createError = require('../utils/create-error')

module.exports = async (req, res, next) => {
  try {
    const authorization = req.headers.authorization;
    if( !authorization || !authorization.startsWith('Bearer ')) createError('Unauthorized', 401)

    const accessToken = authorization.split(' ')[1];
    const payload = jwtService.verify(accessToken)
      // console.log(payload)
    
    const user = await userService.findUserById(payload.id)
    if( !user ) createError('User not found', 404)

    delete user.password;
    req.user = user
    
    next()
    
  } catch (err) {
    next(err)
  }
}