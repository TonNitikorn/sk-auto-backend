const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const cors = require('cors')

const indexRouter = require('./routes/index');
const authRouter = require('./src/v1/auth/router');
const userRouter = require('./src/v1/users/router');
const gameRouter = require('./src/v1/game_menu/router');




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
app.use('/user', userRouter);
app.use('/game', gameRouter);



app.use(errorHandler);

module.exports = app;
