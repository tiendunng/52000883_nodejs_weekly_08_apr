var express = require('express');
var router = express.Router();
var productController = require('../controllers/product.controller');
var jwtTokenValidator = require('../middlewares/jwt-token.guard')
var upload = require('../middlewares/multer') 

router.get('/', productController.getAllProduct)
router.post('/', jwtTokenValidator.jwtTokenValidator, upload.single("image"), productController.addNewProduct)
router.get('/:id', productController.getProductById)
router.put('/:id', jwtTokenValidator.jwtTokenValidator, upload.single("image"),productController.updateProduct)
router.delete('/:id', jwtTokenValidator.jwtTokenValidator, productController.deleteProduct)
router.use('/', (req, res) => {
    res.status(404).json({message: 'Endpoint or method is not supported, please try again'})
})

module.exports = router;