const router = require('express').Router();
const cloudinary = require('cloudinary');
const auth = require('../middleware/auth');
const authAdmin = require('../middleware/authAdmin');
const fs = require('fs');


// UPLOAD IMAGE ON CLOUDINARY
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
});

// UPLOAD IMAGE TO CLOUDINARY ONLY FOR ADMIN
router.post('/upload', auth, authAdmin, (req, res) => {
    try {
        console.log(req.files);
        if(!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).send('No file uploaded');
        }
        const file = req.files.file;
        if(file.size > 1024 * 1024) {
            removeTmp(file.tempFilePath);
            return res.status(400).send('File size too large');
        }

        if(file.mimetype !== 'image/png' && file.mimetype !== 'image/jpeg') {
            removeTmp(file.tempFilePath);
            return res.status(400).send('File type not supported');
        }

        cloudinary.v2.uploader.upload(file.tempFilePath, {folder: 'test'}, async(err, result) => {
            if(err) throw err;

            removeTmp(file.tempFilePath);
            
            res.json({public_id: result.public_id, url: result.secure_url});
        })

    } catch (err) {
        return res.status(500).json({msg: err.message});
    }
})

// DELTE IMAGE FROM CLOUDINARY ONLY FOR ADMIN
router.post('/destroy', auth, authAdmin, (req, res) => {
    try {
        const {public_id} = req.body; // public_id of image
        if(!public_id) 
            return res.status(400).send('No image selected');
        
        cloudinary.v2.uploader.destroy(public_id, (err, result) => {
                if(err) throw err;

                res.json({msg: 'Image deleted'});
        })
    } catch (err) {
        return res.status(500).json({msg: err.message});
    }
})


const removeTmp = (path) => {
    fs.unlink(path, err => {
        if(err) throw err;
    })
}

module.exports = router;