const upload = require('../middlewares/upload')
const uploadService = require('../services/upload-service')
const wrestlerService = require('../services/wrestler-service')

const createError = require('../utils/create-error')

module.exports.getWrestlers = async (req, res, next) => {
  try {
    const wrestlers = await wrestlerService.fetchWrestlers() //{ include: {...:true} }
    res.json(wrestlers)
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch wrestlers' })
  }
}

module.exports.addWrestler = [
  upload.single('image_src'),
  async (req, res, next) => {
    try {
      let { name, alias, height, weight, signature_move, description,  image_src, fb, x, tk } = req.body;
      if( !(name && height && weight && signature_move && description) ) createError('please input all required fields', 400)
        
      if(req.file) image_src = await uploadService.upload(req.file.buffer)

      const newWrestler = await wrestlerService.createWrestlers({
          name, alias, signature_move, description, image_src,
          height: Number(height),
          weight: Number(weight),
      })
        console.log(newWrestler)
        res.status(201).json(newWrestler)
      
    } catch (err) {
      next(err)
    }
  }
]

module.exports.deleteWrestler = async (req, res, next) => {
  try {
    const { id } = req.params

    // check existent
    const wrestler = await wrestlerService.findWrestler(id)
    if( !wrestler ) createError('target wrestler not found', 404)

    // await wrestlerService.hardDeleteWrestlerById(id)
    await wrestlerService.softDeleteWrestlerById(id)

    res.status(200).json({ message: 'Wrestler deleted'})

  } catch (err) {
    next(err)
  }
}