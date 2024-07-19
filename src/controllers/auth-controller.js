const bcrypt = require('bcryptjs')

const createError = require('../utils/create-error')
const jwtService = require('../services/jwt-service')
const userService = require('../services/user-services')

module.exports.register = async (req, res, next) => {
  try {
    const { email, password, confirmPassword, first_name, last_name, mobile, birth_date} = req.body
    if( !(email && password && confirmPassword && first_name && last_name) ) {
      createError("Please fill in necessary fields", 400)
    }
    if( password !== confirmPassword ) createError("Password does not match", 400)
    
    const userExist = await userService.findUserByEmail(email)
    if( userExist ) createError("This email has been registered", 400, "email")
     
    hashedPassword = await bcrypt.hash(password, 10)
    const data = {
			email: email,
			password : hashedPassword,
      first_name : first_name,
      last_name : last_name,
      // mobile : mobile,
      // birth_date : birth_date
		}
    await userService.createUser({data})
    // console.log(data)
    res.status(201).json({ message: 'Successfully Registered'})

  } catch (err) {
    next(err)
  }
}

module.exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body
    if( !(email && password) ) createError('Please fill in all field', 400, )

    const userExist = await userService.findUserByEmail(email)
    if( !userExist ) createError('No user with this email/password found', 400)
      
    const passwordMatch = await bcrypt.compare(password, userExist.password)
    if( !passwordMatch ) createError('Invalid email/password', 400)
      
    const accessToken = jwtService.sign({ id: userExist.id })
    // const accessToken = jwtService.sign({ id: userExist.id, admin: userExist.admin })
    // console.log(userExist)
    // console.log(accessToken)
    res.status(200).json({ accessToken })

  } catch (err) {
      next(err)
  }
}

module.exports.profile = (req, res, next) => res.json({ user: req.user})