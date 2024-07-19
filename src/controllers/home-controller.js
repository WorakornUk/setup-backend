const upload = require('../middlewares/upload')
const uploadService = require('../services/upload-service')

const prisma = require('../models')
const createError = require('../utils/create-error')



module.exports.getVideos = async (req, res, next) => {
  try {
    const videos = await prisma.video.findMany({ include: {category:true} })
    console.log(videos)
    res.json(videos)

  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch videos'})
  }
}

module.exports.addVideo = [
  upload.single('thumbnail'),
  async (req, res, next) => {
    try {
      let { category_id, src, thumbnail } = req.body;
      if( !(category_id && src) ) createError('please input all field,', 400)
        
      if(req.file) thumbnail = await uploadService.upload(req.file.buffer)
      
      const newVideo = await prisma.video.create({
        data: {
          category_id : Number(category_id),
          src,
          thumbnail,
        },
      });
      console.log(newVideo)
  
      res.status(201).json(newVideo);
    } catch (err) {
      next(err)
    }
  }
]

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

module.exports.uploadSomething = [
  upload.single('file'),
  async (req, res, next) => {
    try {
      const file = req.file;

      if (!file) return res.status(400).json({ error: 'No file uploaded' });

      const secure_url = await uploadService.upload(file.buffer);
      res.status(200).json({ url: secure_url });
    } catch (error) {
      next(error);
    }
  },
];