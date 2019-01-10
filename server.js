const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = 8001;
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./api/DB.js');
const path = require('path');
const businessRoute = require('./api/business.route');

mongoose.Promise = global.Promise;
mongoose.connect(config.DB, { useNewUrlParser: true }).then(
  () => {console.log('Database is connected') },
  err => { console.log('Can not connect to the database'+ err)}
);

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/build'));
app.use('/business', businessRoute);
app.get('*', (req, res) => {
  res.sendFile(__dirname + '/build/index.html');
});
app.listen(process.env.PORT || PORT, function(){
  console.log('Server is running on Port:', process.env.PORT || PORT);
});