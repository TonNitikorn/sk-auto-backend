const authServices = require('./service');
// login with jwt token 
exports.login = async (req, res, next) => {
    try {

        const result = await authServices.loginOTP(req.body);
        res.status(200).json(
            result,
        );

    } catch (error) {
        next(error);
    }
}

// Verify OTP
exports.verifyOTP = async (req, res, next) => {
    try {

        const result = await authServices.verifyOTP(req.body);
        res.status(200).json(
            result,
        );

    } catch (error) {
        next(error);
    }
}

// registerOTP
exports.registerOTP = async (req, res, next) => {
    try {

        const result = await authServices.registerOTP(req.body);

        res.status(200).json({
            message: 'Register request success',
            result
        });

    } catch (error) {
        next(error);
    }
}

// Register Verify OTP
exports.registerverifyOTP = async (req, res, next) => {
    try {

        const result = await authServices.registerVerifyOTP(req.body)

        res.status(200).json({
            message: 'Register success',
            result
        });

    } catch (error) {
        next(error);
    }
}
