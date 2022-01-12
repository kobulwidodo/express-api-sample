const db = require('../models')
const authSchema = require('../validation/authSchema')
const apiResponse = require('../helpers/apiResponse')
const bcrypt = require('bcryptjs')
const JWT = require('jsonwebtoken')

const User = db.users

// Register User
const registerUser = async (req, res) => {
  try {
    let body = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    }

    const validate = await authSchema.registerSchema.validateAsync(body)
    const isExist = await User.findOne({ where: { email: body.email } })
    if (isExist) throw new Error('Email sudah terdaftar')

    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(validate.password, salt)
    validate.password = hashPassword

    const user = await User.create(validate)
    res.status(200).send(apiResponse('success', 200, 'Berhasil registrasi user', {name: user.name, email: user.email}))
  } catch (err) {
    res.status(422).send(apiResponse('error', 422, err.message))
  }
}

// Login User
const loginUser = async (req, res) => {
  try {
    let body = {
      email: req.body.email,
      password: req.body.password
    }

    const validate = await authSchema.loginSchema.validateAsync(body)
    const user = await User.findOne({ where: { email: validate.email } })
    if (!user) throw new Error('Email atau Password salah')  

    const validatePass = await bcrypt.compare(validate.password, user.password)
    if(!validatePass) throw new Error('Email atau Password salah')

    const token = JWT.sign({ user_id: user.id }, process.env.SECRET_TOKEN)

    res.status(200).send(apiResponse('success', 200, 'Berhasil Login', { email: user.email, token: token }))
  } catch (err) {
    res.status(422).send(apiResponse('error', 422, err.message))
  }
}

module.exports = {
  registerUser,
  loginUser
}
