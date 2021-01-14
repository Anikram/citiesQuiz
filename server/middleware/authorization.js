const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = async (req, res, next) => {
  try {
    const jwtToken = req.header("token") ? req.header("token") : req.body.token;

    if (!jwtToken) {
      return res.status(403).json('You are not authorized')
    }

    const payload = jwt.verify(jwtToken, process.env.jwtSecret);

    req.user = payload.user;

    next();
  } catch (err) {
    console.error(err.message)
    res.status(403).json('You are not authorized')
  }
}