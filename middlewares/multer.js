const multer = require('multer');

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/images/products/');
    },
    filename: (req, file, cb) => {
        cb(null , file.originalname)
    },
})

var upload = multer({storage:storage})

module.exports = upload