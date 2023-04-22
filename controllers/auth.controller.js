const { check, validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
var service = require('../services/account.service');

let refreshTokenArr = []

exports.validatorRegister = [
  check('fullName')
    .exists().withMessage('Vui lòng cung cấp họ tên')
    .notEmpty().withMessage('Họ tên vui lòng không để trống')
    .isLength({ min: 3 }).withMessage('Họ tên vui lòng có ít nhất 3 kí tự'),

  check('email')
    .exists().withMessage('Vui lòng cung cấp địa chỉ email')
    .notEmpty().withMessage('Email vui lòng không để trống')
    .isEmail().withMessage('Vui lòng cung cấp email hợp lệ'),

  check('password')
    .exists().withMessage('Vui lòng cung cấp mật khẩu')
    .notEmpty().withMessage('Mật khẩu vui lòng không để trống')
    .isLength({ min: 6 }).withMessage('Mật khẩu có ít nhất 6 kí tự'),

  check('confirmPassword')
    .exists().withMessage('Vui lòng nhập mật khẩu xác nhận')
    .notEmpty().withMessage('Mật khẩu xác nhận không được để trống')
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Mật khẩu xác nhận không đúng');
      }
      return true
    })
]

exports.validatorLogin = [
  check('email')
    .exists().withMessage('Vui lòng cung cấp địa chỉ email')
    .notEmpty().withMessage('Email vui lòng không để trống')
    .isEmail().withMessage('Vui lòng cung cấp email hợp lệ'),

  check('password')
    .exists().withMessage('Vui lòng cung cấp mật khẩu')
    .notEmpty().withMessage('Mật khẩu vui lòng không để trống')
    .isLength({ min: 6 }).withMessage('Mật khẩu có ít nhất 6 kí tự')
]

exports.renderLoginPage = (req, res, next) => res.render('accounts/login', {layout: 'index'})

exports.refreshToken = (req, res, next) => {
  const {token} = req.body
  if (!token) return res.status(401).json({message: "Unthorized token"})
  if (refreshTokenArr.includes(token)) return res.status(403).json({message: "Forbidden token"})

  jwt.verify (token, process.env.REFRESH_TOKEN, (err, data) => {
    if (err) return res.status(401).json({message: "Unthorized token"})
    const accessToken = jwt.sign({username: data.username}, process.env.ACCESS_TOKEN, {expiresIn: '1h'})
    return res.status(200).json({'access_token': accessToken})
  })
}

exports.authenToken = (req, res, next) => {
  const authorizationHeader = req.headers['authorization']
  //console.log(authorizationHeader)
  if (!authorizationHeader) {
    return next()
  }
  const accessToken = authorizationHeader.split(' ')[1]
  if (!accessToken) return res.status(401).json({message: 'Invalid Access Token'})
  jwt.verify(accessToken, process.env.ACCESS_TOKEN, (err, data) => {
    if (err) return res.status(403).json({'message': 'Forbidden'})
    res.redirect('/')
  })
}

exports.login = async (req, res, next) => {
  try {
    let result = validationResult(req)
    if (result.errors.length !== 0) {
      let rel = result.mapped()
      let msg = ''
      for (i in rel) {
        msg = rel[i]
        break
      }
      return res.status(500).json({ message: msg })
    }
    const { email, password } = req.body;
    const userId = await service.login({ email, plainTextPassword: password });
    //Match password
    let accessToken = jwt.sign({ payload: userId }, process.env.ACCESS_TOKEN, {algorithm: 'HS256', expiresIn: '1h' })
    let refreshToken = jwt.sign({ payload: userId }, process.env.REFRESH_TOKEN)
    refreshTokenArr.push(refreshToken)
    return res.status(200).json({
      access_token: accessToken,
      refresh_token: refreshToken,
    })
  }
  catch (err) {
    console.log(err);
    return res.status(500).send(err.message);
  }
}

exports.renderRegisterPage = (req, res, next) => res.render('accounts/register', {layout: 'index'})

exports.register = async (req, res, next) => {
  try {
    let result = validationResult(req)
    if (result.errors.length !== 0) {
      let rel = result.mapped()
      let msg = ''
      for (i in rel) {
        msg = rel[i]
        break
      }
      return res.status(500).json({ message: msg })
    }
    const { fullName, email, password } = req.body;

    const id = await service.register({ email, fullName, password });

    res.status(201).json({
      message: 'User registered',
      id,
    });
  } catch (err) {
    res.status(500).send('Something went wrong');
  }
}

exports.logout = async (req, res, next) => {
  try {
    // Handle logout
    const refreshToken = req.body.token
    refreshTokenArr = refreshTokenArr.filter(refrs => refrs !== refreshToken)
    req.user = null
    res.redirect('/')
  } catch (err) {
    next(err);
  }
}