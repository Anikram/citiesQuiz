const Pool = require('pg').Pool;

const pool = new Pool({
  user: 'anikram',
  password: 'password',
  host: 'localhost',
  port: 5432,
  database: 'game'
});

module.exports = pool;