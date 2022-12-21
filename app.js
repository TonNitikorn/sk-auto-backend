const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const cors = require('cors')

const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');
console.log(' :>> ');


// const passport = require('./middleware/passport');
const errorHandler = require('./middleware/error_handler');

const app = express();

app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/auth', authRouter);



app.use(errorHandler);

module.exports = app;
