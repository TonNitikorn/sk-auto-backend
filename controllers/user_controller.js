const model = require('../models/index');
const config = require('../config/index');

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
