const upload = require('../middlewares/upload')
const uploadService = require('../services/upload-service')
const showService = require('../services/show-service')

const createError = require('../utils/create-error')

module.exports.getShows = async (req, res, next) => {
  try {
    const shows = await showService.getAllEvents()
    res.json(shows)
    
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch shows"})
    
  }
}

module.exports.getShowById = async (req, res, next) => {
  try {
    const { id } = req.params
    const show = await showService.getEventById(id)

    res.json(show)

  } catch (err) {
    res.status(404).json({ message: "Event not found"})
    
  }
}