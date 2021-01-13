const router = require('express').Router();
const pool = require('../db')
const bcrypt = require("bcrypt");
const jwtGenerator = require("../utils/jwtGenerator");
const { body, validationResult } = require('express-validator');
const authorization = require('../middleware/authorization');

router.post('/register',
  // email must be valid
  body('email').isEmail(),
  // password must be at least 5 chars long
  body('password').isLength({ min: 5 }),
  async (req, res) => {
  try {
    console.log(req.body)
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {name, email, password} = req.body;
    const user = await pool.query('SELECT * FROM users WHERE user_email=$1', [email]);

    if (user.rows.length !== 0) {
      return res.status(401).json('User already exists')
    }

    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const bcryptPassword = await bcrypt.hash(password, salt);


    const newUser = await pool.query('INSERT INTO users (user_name, user_email, user_password) VALUES($1,$2,$3) RETURNING *',
      [name, email, bcryptPassword]);

    const token = await jwtGenerator(newUser.rows[0].user_id);

    return res.json({token});

  } catch (err) {
    console.error(err.message);
    return  res.status(500).send('Server error at jwtAuth router')
  }
})

router.post('/login',
  // email must be valid
  body('email').isEmail(),
  // password must be at least 5 chars long
  body('password').isLength({ min: 5 }),
  async (req,res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {email, password} = req.body;
    const user = await pool.query('SELECT * FROM users WHERE user_email = $1',[email]);

    if (user.rows.length === 0){
      return res.status(401).json('Password or email is incorrect')
    }

    const validPassword = await bcrypt.compare(password,user.rows[0].user_password);

    if (!validPassword) {
      return res.status(401).json('Password or email is incorrect')
    }

    const token = jwtGenerator(user.rows[0].user_id);
    res.json({token});
  } catch (err) {
    console.error(err.message)
  }
})

router.get('/is-verify', authorization, async (req,res) => {
  try {
    res.json(true)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error');
  }
})

module.exports = router;