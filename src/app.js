const express = require('express');
const logger = require('morgan');

const cors = require('cors')

//version 1
const authRouter = require('./v1/auth/router');
const userRouter = require('./v1/users/router');
const bankRouter = require('./v1/bank/router');
//menu
const menuRouter = require('./v1/menu/router');
//


//version 2
const version2Router = require('./v2/router');

// const passport = require('./middleware/passport');
const errorHandler = require('./middleware/error_handler');

const app = express();

app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//version 1
app.use('/auth', authRouter);
app.use('/user', userRouter);
app.use('/bank', bankRouter);
//menu
app.use('/menu', menuRouter);
//

//version 2
app.use('/v2', version2Router);




// catch 404 and forward to error handler
app.use(function (req, res, next) {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

app.use(errorHandler);

module.exports = app;
