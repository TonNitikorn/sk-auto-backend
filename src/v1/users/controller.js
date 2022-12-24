const model = require('../../../models/index');
const config = require('../../../config/index');

//get profile by token
exports.getProfile = async (req, res, next) => {
    try {
        const member = await model.members.findOne({
            where: {
                uuid: req.member.uuid
            },
            //attribute exclude password
            attributes: { exclude: ['password',"id",'update_at'] }
        });

        //check member is null
        if (!member) {
            const error = new Error("ไม่พบข้อมูล");
            error.statusCode = 401
            throw error;
        }
    
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
        const credit = await model.credit.findOne({
            where: {
                member_uuid: req.member.uuid
            },
            attributes: { exclude: ['id','update_at'] }
        });

        //check credit is null
        if (!credit) {
            const error = new Error("ไม่พบข้อมูล");
            error.statusCode = 401
            throw error;
        }
    
        res.status(200).json(
             credit
        );

    } catch (error) {
        next(error);
    }
}

