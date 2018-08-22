const express = require('express');
const path = require ('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport-jwt');
const mongoose = require('mongoose');

const app = express();
const port = 8080;

app.get('/', (req, res) => {
    res.send('Hello world! ');
})
app.listen(port, ()=> {
    console.log('Server started on port ' + port + ' Press CTRL+C to exit. ')
});
