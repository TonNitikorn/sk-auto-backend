const model = require('../../models/index');
const config = require('../../config/index');

 exports.login = async (data) => {
    //create jwt token
    const token = jwt.sign({ uuid: member.uuid, }, config.JWT_KEY, { expiresIn: config.JWT_EXP });

    return {
        access_token: token,
        token_type: "Bearer"
    }

};

//get profile by token
exports.profile = async (data) => {
    const member = await model.members.findOne({
        where: {
            uuid: data.uuid
        },
        attributes: { exclude: ['id','update_at', "password"] }
    });

    //check member is null
    if (!member) {
        const error = new Error("ไม่พบข้อมูล");
        error.statusCode = 401
        throw error;
    }

    return member;

}

//get credit by req.member.uuid
exports.getCredit = async (data) => {
    const credit = await model.members.findOne({
        where: {
            uuid: data.uuid
        },
        attributes: { exclude: ['id','update_at'] }
    });

    //check credit is null
    if (!credit) {
        const error = new Error("ไม่พบข้อมูล");
        error.statusCode = 401
        throw error;
    }

    return credit.credit;

}

