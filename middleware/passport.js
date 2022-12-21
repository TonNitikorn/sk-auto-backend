const models = require("../models/index");
const passport = require('passport');
const config = require('../config/index');

// const JwtStrategy = require('passport-jwt').Strategy,ExtractJwt = require('passport-jwt').ExtractJwt;
const { Strategy: JwtStrategy , ExtractJwt: ExtractJwt } = require('passport-jwt');

passport.use(new JwtStrategy({ 
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.JWT_KEY, 
}, async (token, done) => {
    return done(null, token);
})); 

exports.authorized = async (req, res, next) => {
    passport.authenticate('jwt', { session: false, }, async (error, token) => {
        try {
            if (error || !token) {
                const error = new Error("Unauthorized")
                error.statusCode = 401
                throw error;
            } 

            const member = await models.member.findOne({
                    where: { uuid: token.uuid },
            });

            if (!member) {
                const error = new Error("Invalid Token")
                error.statusCode = 401
                throw error;
            }

            // check status is active
            if (member.status !== 'active') {
                const error = new Error("Account is not active")
                error.statusCode = 401
                throw error;
            }

            req.member = member;

        } catch (error) {
            next(error);
        }
        next();
    })(req, res, next);

}
