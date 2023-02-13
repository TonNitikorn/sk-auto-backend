const model = require('../../models/index');
const config = require('../../config/index');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');
const { default: axios } = require('axios');


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

//Line login
exports.lineLogin = async (data) => {
    //check body data is null
    if (!data.code) {
        const error = new Error("ข้อมูลไม่ถูกต้อง");
        error.statusCode = 401
        throw error;
    }

    try {

        //check code
        const responsecode = await axios.post(
            'https://api.line.me/oauth2/v2.1/token',
            new URLSearchParams({
                'grant_type': 'authorization_code',
                'code': data.code,
                'client_id': '1657892994',
                'client_secret': '8e6d6544d20fdc5d31207428bd174080'
            })
        );
        const responseverify = await axios.post(
            'https://api.line.me/oauth2/v2.1/verify',
            new URLSearchParams({
                'id_token': responsecode.data.id_token,
                'client_id': '1657892994'
            })
        );

        console.log(responseverify.data);


        //check user is exist
        const member = await model.members.findOne({
            where: {
                line_id: responseverify.data.sub
            }
        });

        if (!member) {
            const error = new Error("ไม่พบข้อมูลผู้ใช้งาน");
            error.statusCode = 401
            throw error;
        }

        //create jwt token
        const token = jwt.sign({ uuid: member.uuid, }, config.JWT_KEY, { expiresIn: config.JWT_EXP });
        // const expiresin = jwt.decode(token).exp;

        return {
            message: 'Line Login success',
            accesstoken: token,
            type: 'Bearer',
        };

    } catch (error) {
        
    }

    
}
