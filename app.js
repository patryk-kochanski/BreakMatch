const express = require('express');
const path = require ('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const users = require('./routes/users');
const matches = require('./routes/matches');
const config = require('./config/database');
const app = express();
const port = 8081;

app.use(bodyParser.json());
app.use(cors());
app.use('/matches', matches);
app.use('/users', users);
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

//Connect to DB
mongoose.connect(config.database, {useNewUrlParser: true});
mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB: '+ config.database);
})
mongoose.connection.on('error', (err) => {
    console.log('Database error: '+ err);
})

app.get('/', (req, res) => {
    res.send('Hello world! ');
})

//Start server
app.listen(port, ()=> {
    console.log('Server started on port ' + port + ' Press CTRL+C to exit. ')
});
