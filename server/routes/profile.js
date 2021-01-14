const router = require('express').Router();
const pool = require('../db');
const authorization = require('../middleware/authorization');

router.get('/',
  authorization,
  async (req,res) => {
    try {
      //req.user is a payload (../middleware/authorization.js)
      const user = await pool.query("SELECT user_name,top_score,user_id FROM users WHERE user_id = $1",[req.user])

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
      res.json(games.rows)
    } catch (err) {
      console.error(err.message)
      res.status(500).send('Server error');
    }
  })

router.get('/game', authorization, async (req,res) => {
  try {
    const game = await pool.query("SELECT * FROM games WHERE game_id = $1",[req.header("game_id")])
    const regionCities = await pool.query("SELECT cities FROM regions WHERE region_id = $1",[1])
    res.json({...game.rows[0],...regionCities.rows[0]})
  } catch (err) {
    console.error(err.message)
  }
})

router.post('/game',authorization, async (req,res) => {
  try {

    const newGame = await pool.query("INSERT INTO games (user_id, region_id) VALUES($1,$2) RETURNING * ",[req.body.user_id,1])
    const regionCities = await pool.query("SELECT cities FROM regions WHERE region_id = $1",[1])

    res.json({...newGame.rows[0],...regionCities.rows[0]})
  } catch (err) {
    console.error(err.message)
  }
})




module.exports = router;
