const model = require('../../models/index');
const config = require('../../config/index');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');

// login with jwt token
exports.login = async (data) => {

    if (!data.tel || !data.password) {
        return res.status(400).json({
            message: 'ข้อมูลไม่ถูกต้อง'
        });
    }

    const member = await model.members.findOne({
        where: {
            tel: data.tel
        }
    });

    if (!member) {
        const error = new Error("หมายเลขโทรศัพท์ หรือ Password ไม่ถูกต้อง");
        error.statusCode = 401
        throw error;
    }

    // check password by bcryptjs   
    const isMatch = await bcrypt.compare(data.password, member.password);
    if (!isMatch) {
        const error = new Error("รหัสผ่านไม่ถูกต้อง");
        error.statusCode = 401
        throw error;
    }

    // check status is active
    if (member.status !== 'ACTIVE') {
        const error = new Error("บัญชีของคุณถูกระงับ");
        error.statusCode = 401
        throw error;
    }

    //create jwt token
    const token = jwt.sign({ uuid: member.uuid, }, config.JWT_KEY, { expiresIn: config.JWT_EXP });
    // const expiresin = jwt.decode(token).exp;

    //return token
    return {
        message: 'Login success',
        accesstoken: token,
        type: 'Bearer',
    };
}


 









exports.register = async (data) => {

    //check body data is null
    if (!data.fname || !data.lname || !data.bank_name || !data.bank_number || !data.tel || !data.line_id || !data.platform || !data.password || !data.affiliate_by) {
        return res.status(400).json({
            message: 'ข้อมูลไม่ถูกต้อง'
        });
    }

    // const member = await model.members.findOne({
    //     where: {
    //         tel : tel
    //     }
    // });

    // if (member) {
    //     const error = new Error("หมายเลขโทรศัพท์นี้มีผู้ใช้งานแล้ว");
    //     error.statusCode = 401
    //     throw error;
    // }

    // check password by bcryptjs   
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(data.password, salt);

    // create member
    const member = await model.members.create({
        uuid: uuidv4(),
        name: data.fname +' '+ data.lname,
        fname: data.fname,
        lname: data.lname,
        bank_name: data.bank_name,
        bank_number: data.bank_number,
        tel: data.tel,
        line_id: data.line_id,
        platform: data.platform,
        password: hashPassword,
        create_by: '-',
        affiliate_by: data.affiliate_by,
        status: 'ACTIVE',
        credit: 0,
        points: 0,
        rank: 'MEMBER',
        point_affiliate: 0,
        create_at: new Date(),
    });

    const token = jwt.sign({ uuid: member.uuid, }, config.JWT_KEY, { expiresIn: config.JWT_EXP });
    // const expiresin = jwt.decode(token).exp;
    return {
        access_token: token,
        token_type: "Bearer"
    }

};

//edit password
exports.editPassword = async (data,req) => {    
        //check body data is null
        if (!data.new_password) {
            console.log('object :>> HERE 77 ');
            return res.status(400).json({
                message: 'ข้อมูลไม่ถูกต้อง'
            });
        }
    
        // check password by bcryptjs   
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(data.new_password, salt);
    
        const member = await model.members.update({
            password: hashPassword,
        }, {
            where: {
                uuid: req.uuid
            }
        });
    
        return member
    
    }
