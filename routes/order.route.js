var express = require('express');
var router = express.Router();
var orderController = require('../controllers/order.controller')
var jwtTokenValidator = require('../middlewares/jwt-token.guard')

router.get('/', jwtTokenValidator.jwtTokenValidator, orderController.getAllOrder)
router.post('/', jwtTokenValidator.jwtTokenValidator, orderController.addNewOrder)
router.get('/:id', jwtTokenValidator.jwtTokenValidator, orderController.detailOrder)
router.put('/:id', jwtTokenValidator.jwtTokenValidator, orderController.updateOrder)
router.delete('/:id', jwtTokenValidator.jwtTokenValidator, orderController.deleteOrder)
router.use('/', (req, res) => {
    res.status(404).json({message: 'Endpoint or method is not supported, please try again'})
})

module.exports = router;