const { Router } = require('express')
const path = require('path')
const multer = require('multer')
const Image = require('../Models/image')
const router = Router();
const cloudinary = require('cloudinary')
const uuid=require('uuid/v4')

cloudinary.config({
    cloud_name:'cloudinary-imageistl',
    api_key:'972518515937313',
    api_secret:'fSj7UEi3pTuzy69gKFVmVepGhcQ',
})

const storage = multer.diskStorage({
    destination: path.join(__dirname, '../public/images'),
    filename: (req, file, cb) => {
        cb(null, uuid() + path.extname(file.originalname).toLocaleLowerCase())
    }
})
const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        const typesFile = /jpeg|png|jpg|gif/
        const extname = typesFile.test(file.mimetype)
        const names = typesFile.test(path.extname(file.originalname).toLocaleLowerCase());
        if (names && extname) {
            return cb(null, true)
        } else {
            cb('no es uma imagen')
            
        }
    }
}).single('image')

router.post('/saveImage', upload, async (req, res) => {
    const image = new Image();
    const result = await cloudinary.v2.uploader.upload(req.file.path)
    image.filename = req.file.filename
    image.path = req.file.filename
    image.nombre = req.body.nombre
    await image.save();
    console.log(result)
    res.status(200).json({mensaje:"guardado"})

}).get('/all', async (req, res) => {
    const image = await Image.find()
    res.json(image)

}).post('/oneImage',async(req,res)=>{
    const image = await Image.findOne({_id:req.body._id});
    res.status(200).json(image)
}).get('/',(req,res)=>{
    res.render('index')
})

module.exports = router