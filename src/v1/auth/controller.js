const authServices = require('./service');
// login with jwt token 
exports.login = async (req, res, next) => {
    try {

        const result = await authServices.login(req.body);
        res.status(200).json(
            result,
        );

    } catch (error) {
        next(error);
    }
}
// register with jwt token bcryptjs

exports.register = async (req, res, next) => {
    try {

        const result = await authServices.register(req.body);

        res.status(200).json({
            message: 'Register success',
            result
        });

    } catch (error) {
        next(error);
    }
}


//edit password
exports.editPassword = async (req, res, next) => {
    try {
        const result = await authServices.editPassword(req.body, req.member);

        res.status(200).json({
            message: 'Edit password success',

        });

    } catch (error) {
        next(error);
    }
}
