var express = require('express');
var router = express.Router();
var authController = require('../controllers/auth.controller');

router.post('/refreshToken', authController.refreshToken)
router.get('/login', authController.renderLoginPage);
router.post('/login', authController.validatorLogin, authController.login);

router.get('/register', authController.renderRegisterPage);
router.post('/register', authController.validatorRegister, authController.register);

router.get('/logout', function (req, res, next) {
  res.send('respond with a resource');
});

router.use('/', (req, res) => {
  res.status(404).json({message: 'Endpoint or method is not supported, please try again'})
})

module.exports = router;