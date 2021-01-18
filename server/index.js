const express = require('express');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 5000;

//middleware
app.use(express.json());
app.use(cors());

//ROUTES
//auth
app.use('/auth', require('./routes/jwtAuth'));
//profile
app.use('/profile', require('./routes/profile'));
app.use('/users', require('./routes/users'));

app.listen(PORT,() => {
  console.log(`Server is running on ${PORT} port.`)
})