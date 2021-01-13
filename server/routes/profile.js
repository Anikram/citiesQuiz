const router = require('express').Router();
const pool = require('../db');
const authorization = require('../middleware/authorization');

router.get('/',
  authorization,
  async (req,res) => {
    try {
      //req.user is a payload (../middleware/authorization.js)
      const user = await pool.query("SELECT user_name FROM users WHERE user_id = $1",[req.user])

      res.json(user.rows[0])
    } catch (err) {
      console.error(err.message)
      res.status(500).send('Server error');
    }
  })
router.get('/games',
  authorization,
  async (req,res) => {
    try {
      //req.user is a payload (../middleware/authorization.js)
      const games = await pool.query("SELECT * FROM games WHERE user_id = $1",[req.user])
      const region = await pool.query("SELECT cities FROM regions WHERE region_id = $1",[1])

      const gamesWithCities = games.rows.map(el => {
        return {...el, ...region.rows[0]}
      })

      res.json(gamesWithCities)
    } catch (err) {
      console.error(err.message)
      res.status(500).send('Server error');
    }
  })


module.exports = router;
