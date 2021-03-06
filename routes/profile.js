const router = require('express').Router();
const pool = require('../db/db');
const authorization = require('../middleware/authorization');

router.get('/',
  authorization,
  async (req,res) => {
    try {
      // console.log('-------GET /')
      //req.user is a payload (../middleware/authorization.js)
      const user = await pool.query("SELECT user_name,top_score,user_id,top_score FROM users WHERE user_id = $1",[req.user])

      res.json(user.rows[0])
    } catch (err) {
      console.error(err.message)
      res.status(500).send('Server error');
    }
  })
router.put('/',
  authorization,
  async (req,res) => {
    try {
      // console.log('-------PUT /')
      const {top_score, user_id} = req.body;
      const user = await pool.query("UPDATE users SET top_score=$1 WHERE user_id=$2 RETURNING *",[top_score, user_id]);
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
      // console.log('-------GET /games')
      //req.user is a payload (../middleware/authorization.js)
      const games = await pool.query("SELECT * FROM games WHERE user_id = $1 AND game_finished=TRUE ORDER BY created_at DESC LIMIT 10",[req.user])
      res.json(games.rows)
    } catch (err) {
      console.error(err.message)
      res.status(500).send('Server error');
    }
  })

router.get('/game', authorization, async (req,res) => {
  try {
    // console.log('-------GET /game')
    const game = await pool.query("SELECT * FROM games WHERE game_id = $1",[req.header("game_id")])
    const regionCities = await pool.query("SELECT cities FROM regions WHERE region_id = $1",[1])
    res.json({...game.rows[0],...regionCities.rows[0]})
  } catch (err) {
    console.error(err.message)
  }
})

router.post('/game',authorization, async (req,res) => {
  try {
    // console.log('-------POST /game')
    const {user_id, region_name} = req.body;
    const region_id = await pool.query("SELECT (region_id) FROM regions WHERE region_name = $1",[region_name])
    const newGame = await pool.query("INSERT INTO games (user_id, region_id) VALUES($1,$2) RETURNING * ",[user_id,region_id.rows[0].region_id])
    const regionCities = await pool.query("SELECT cities FROM regions WHERE region_name = $1",[req.body.region_name])
    res.json({...newGame.rows[0],...regionCities.rows[0]})
  } catch (err) {
    console.error(err.message)
  }
})

router.put('/game', authorization, async (req, res) => {
  try {
    // console.log('------- PUT /game - finish')
    const {game_id, score, distance, win} = req.body;
    const response = await pool.query("UPDATE games SET game_finished=$1, score=$2, distance=$3, win=$4 WHERE game_id=$5 RETURNING *",[true,score,distance,win,game_id])
    res.json(response.rows[0])
  } catch (err) {
    console.error(err.message)
  }
})

router.delete('/game', authorization, async (req, res) => {
  try {
    // console.log('-------DELETE /game')
    const {game_id} = req.body;
    const response = await pool.query("DELETE FROM games WHERE game_id=$1 RETURNING *",[game_id])
    res.json(response.rows[0])
  } catch (err) {
    console.error(err.message)
  }
})




module.exports = router;
