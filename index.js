const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const PORT = process.env.PORT || 5000;

//middleware
app.use(express.json());
app.use(cors());

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));


  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

//ROUTES
//auth
app.use('/api/auth', require('./routes/jwtAuth'));
//profile
app.use('/api/profile', require('./routes/profile'));
app.use('/api/users', require('./routes/users'));


app.listen(PORT,() => {
  console.log(`Server is running on ${PORT} port.`)
})