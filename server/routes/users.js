const router = require('express').Router();
const pool = require('../db');
const authorization = require('../middleware/authorization');

router.get('/',
  authorization,
  async (req,res) => {
    try {
      const users = await pool.query("SELECT * FROM users")
      res.json(users.rows)
    } catch (err) {
      console.error(err.message)
      res.status(500).send('Server error');
    }
  })

module.exports = router;