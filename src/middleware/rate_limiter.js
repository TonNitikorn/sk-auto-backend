//setup rate limiter
const rateLimit = require("express-rate-limit");
const limiter = rateLimit({
    windowMs: 5 * 60 * 1000, // 5 minutes
    max: 5, // limit each IP to 5 requests per windowMs
    message: {
        status: 429,
        message: "Too many request from this IP, please try again after 5 minutes",
    },
    standardHeaders: true,
});


module.exports = limiter;