module.exports = ( msg, statusCode, field ) => {
  const error = new Error(msg)
  error.statusCode = statusCode
  if (field) error.field = field

  throw error
}