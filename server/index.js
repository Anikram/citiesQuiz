const express = require('express');
const app = express();
const cors = require('cors');

//middleware
app.use(express.json());
app.use(cors());

//ROUTES
//auth
app.use('/auth', require('./routes/jwtAuth'));
//profile
app.use('/profile', require('./routes/profile'))

app.listen(5000,() => {
  console.log('Server is running on port 5000')
})