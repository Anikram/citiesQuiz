const router = require('express').Router();
const pool = require('../db/db');
const authorization = require('../middleware/authorization');

router.get('/',

  async (req,res) => {
    try {
      // console.log('-------GET /')
      const users = await pool.query("SELECT user_name,top_score FROM users WHERE top_score != 0 ORDER BY  top_score DESC LIMIT 5 ")
      res.json(users.rows)
    } catch (err) {
      console.error(err.message)
      res.status(500).send('Server error');
    }
  })

module.exports = router;