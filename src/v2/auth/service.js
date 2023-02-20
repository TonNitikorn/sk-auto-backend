const model = require('../../models/index');
const config = require('../../config/index');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const axios = require('axios');



// loginOTP
exports.loginOTP = async (data) => {

    if (!data.tel) {
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
        const error = new Error("ไม่มีข้อมูลผู้ใช้งานนี้");
        error.statusCode = 401
        throw error;
    }


    // check status is active
    if (member.status !== 'ACTIVE') {
        const error = new Error("บัญชีของคุณถูกระงับ");
        error.statusCode = 401
        throw error;
    }


    headers = {
        "accept": "application/json",
        "content-type": "application/x-www-form-urlencoded"
    }

    let key = '1757632322265781';
    let secret = '2e828b5980cc5c71eff0684089faef63';


    payload = `key=${key}&secret=${secret}&msisdn=${data.tel}`

    //send sms
    try {
        const sms = await axios.post('https://otp.thaibulksms.com/v2/otp/request', payload, { headers: headers });

        return sms.data;
    } catch (error) {
        const err = new Error(error);
        err.statusCode = 500;
        throw err;
    }

}


//verifyOTP
exports.verifyOTP = async (data) => {
    
        if (!data.tel || !data.pin || !data.token) {
            return res.status(400).json({
                message: 'ข้อมูลไม่ถูกต้อง'
            });
        }
        headers = {
            "accept": "application/json",
            "content-type": "application/x-www-form-urlencoded"
        }
    
        let key = '1757632322265781';
        let secret = '2e828b5980cc5c71eff0684089faef63';
    
        payload = `key=${key}&secret=${secret}&token=${data.token}&pin=${data.pin}`
    
        //verify sms
        try {
            const sms = await axios.post('https://otp.thaibulksms.com/v2/otp/verify', payload, { headers: headers });
    
            if (sms.data.status == 'success') {
    
                const member = await model.members.findOne({
                    where: {
                        tel: data.tel
                    }
                });

                //check member is null
                if (!member) {
                    const error = new Error("ไม่มีข้อมูลผู้ใช้งานนี้");
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
                

                return {
                    message: 'Login success',
                    accesstoken: token,
                    type: 'Bearer',
                };

            } else if (sms.data.status == 'error') {
                const error = new Error('OTP is invalid');
                error.statusCode = 400;
                throw error;
            }
        } catch (error) {
            const err = new Error(error);
            err.statusCode = 500;
            throw err;
        }


}

exports.registerOTP = async (data) => {

    //check body data is null
    if (!data.bank_name || !data.bank_number || !data.tel || !data.platform || !data.affiliate_by) {
        const error = new Error("ข้อมูลไม่ถูกต้อง");
        error.statusCode = 400
        throw error;
    }

    //check tel is exist
    const member = await model.members.findOne({
        where: {
            tel: data.tel
        }
    });

    if (member) {
        const error = new Error("มีข้อมูลผู้ใช้งานนี้แล้ว");
        error.statusCode = 401
        throw error;
    }

    headers = {
        "accept": "application/json",
        "content-type": "application/x-www-form-urlencoded"
    }

    let key = '1757632322265781';
    let secret = '2e828b5980cc5c71eff0684089faef63';


    payload = `key=${key}&secret=${secret}&msisdn=${data.tel}`

    //send sms
    try {
        const sms = await axios.post('https://otp.thaibulksms.com/v2/otp/request', payload, { headers: headers });

        if (sms.data.status == 'success') {
            return sms.data;

        } else if (sms.data.status == 'error') {
            const error = new Error('OTP is Fail');
            error.statusCode = 400;
            throw error;
        }

    } catch (error) {
        const err = new Error(error);
        err.statusCode = 500;
        throw err;
    }

};

//register verify OTP
exports.registerVerifyOTP = async (data) => {

    //check body data is null
    if (!data.bank_name || !data.bank_number || !data.tel || !data.platform || !data.affiliate_by || !data.pin || !data.token) {
        const error = new Error("ข้อมูลไม่ถูกต้อง");
        error.statusCode = 400
        throw error;
    }

    headers = {
        "accept": "application/json",
        "content-type": "application/x-www-form-urlencoded"
    }

    let key = '1757632322265781';
    let secret = '2e828b5980cc5c71eff0684089faef63';

    payload = `key=${key}&secret=${secret}&token=${data.token}&pin=${data.pin}`

    //verify sms
    try {
        const sms = await axios.post('https://otp.thaibulksms.com/v2/otp/verify', payload, { headers: headers });

        if (sms.data.status == 'success') {
            // check member is exist
            const member = await model.members.findOne({
                where: {
                    tel: data.tel
                }
            });

            //check member is null
            if (!member) {
                const error = new Error("มีผู้ใช้งานนี้แล้ว");
                error.statusCode = 401
                throw error;
            }

            // create member
            const createmember = await model.members.create({
                uuid: uuidv4(),
                bank_name: data.bank_name,
                bank_number: data.bank_number,
                tel: data.tel,
                line_id: data.line_id,
                platform: data.platform,
                create_by: '-',
                affiliate_by: data.affiliate_by,
                status: 'ACTIVE',
                credit: 0,
                points: 0,
                rank: 'MEMBER',
                point_affiliate: 0,
                create_at: new Date(),
            });

            //check create member success
            if (!createmember) {
                const error = new Error("สมัครสมาชิกไม่สำเร็จ");
                error.statusCode = 401
                throw error;
            }

            
            //create jwt token
            const token = jwt.sign({ uuid: createmember.uuid, }, config.JWT_KEY, { expiresIn: config.JWT_EXP });

            return {
                message: 'Register success',
                accesstoken: token,
                type: 'Bearer',
            };
    
        } 
    } catch (error) {
        const err = new Error(error);
        err.statusCode = 500;
        throw err;
    }

};
