const model = require('../../models/index');
const config = require('../../config/index');
const userServices = require('./service');
//get profile by token
exports.getProfile = async (req, res, next) => {
    try {
        const member = await userServices.profile(req.member);
        res.status(200).json(
             member
        );

    } catch (error) {
        next(error);
    }
}

//get credit by req.member.uuid
exports.getCredit = async (req, res, next) => {
    try {
       
        const credit = await userServices.getCredit(req.member);
    
        res.status(200).json(
             credit
        );

    } catch (error) {
        next(error);
    }
}

