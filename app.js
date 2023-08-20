const mongoose = require('mongoose');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

require('dotenv').config({
  path: path.join(__dirname, 'environments', process.env.NODE_ENV === 'production' ? 'production.env' : 'development.env'),
});

const app = express();

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('Mongodb connected'))
  .catch((error) => {
    console.log('Mongodb connection failed. exiting now...');
    console.error(error);
    process.exit(1);
  });

app.use(logger('dev'));
app.use(express.json({limit: '150mb'}));
app.use(express.urlencoded({ limit: '150mb', extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors({ origin: '*' }));

app.use('/', require('./routes/order'));
app.use('/users', require('./routes/users'));
app.use('/profile', require("./routes/profile"));

module.exports = app;
