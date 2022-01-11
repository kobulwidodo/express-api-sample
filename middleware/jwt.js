const JWT = require('jsonwebtoken')
const apiResponse = require('../helpers/apiResponse')

const auth = (req, res, next) => {
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1]

  if (!token) return res.status(401).send(apiResponse('error', 401, 'Access Denied'))
  try {
    const verified = JWT.verify(token, process.env.SECRET_TOKEN)
    req.user = verified
    next()
  } catch (err) {
    res.status(400).send(apiResponse('error', 400, 'Invalid Token'))
  }
}

module.exports = auth
