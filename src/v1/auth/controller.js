const model = require('../../../models/index');
const config = require('../../../config/index');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');

// login with jwt token 
exports.login = async (req, res, next) => {
    try {
        const { tel, password } = req.body;

        //check tel and password is null
        if (!tel || !password) {
            return res.status(400).json({
                message: 'ข้อมูลไม่ถูกต้อง'
            });
        }

        const member = await model.members.findOne({
            where: {
                tel: tel
            }
        });

        if (!member) {
            const error = new Error("หมายเลขโทรศัพท์ หรือ Password ไม่ถูกต้อง");
            error.statusCode = 401
            throw error;
        }

        // check password by bcryptjs   
        const isMatch = await bcrypt.compare(password, member.password);
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

        res.status(200).json({
            message: 'Login success',
            accesstoken: token,
            type: 'Bearer',
        });

    } catch (error) {
        next(error);
    }
}


// register with jwt token bcryptjs

exports.register = async (req, res, next) => {
    try {
        const { name, bank_name, bank_number, tel, line_id, platform, password, affiliate_by } = req.body;

        //check body data is null
        if (!name || !bank_name || !bank_number || !tel || !line_id || !platform || !password || !affiliate_by) {
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
        const hashPassword = await bcrypt.hash(password, salt);

        // create member
        const member = await model.members.create({
            uuid: uuidv4(),
            name: name,
            bank_name: bank_name,
            bank_number: bank_number,
            tel: tel,
            line_id: line_id,
            platform: platform,
            password: hashPassword,
            create_by: '-',
            affiliate_by: affiliate_by,
            status: 'ACTIVE',
            credit: 0,
            points: 0,
            rank: 'MEMBER',
            point_affiliate: 0,
            create_at: new Date(),
        });

        const token = jwt.sign({ uuid: member.uuid, }, config.JWT_KEY, { expiresIn: config.JWT_EXP });
        // const expiresin = jwt.decode(token).exp;

        res.status(200).json({
            message: 'Register success',
            token: token,
        });

    } catch (error) {
        next(error);
    }
}


//edit password
exports.editPassword = async (req, res, next) => {
    try {
        const {  new_password } = req.body;

        //check body data is null
        if (!new_password) {
            return res.status(400).json({
                message: 'ข้อมูลไม่ถูกต้อง'
            });
        }

        // const member = await model.members.findOne({
        //     where: {
        //         uuid : req.member.uuid
        //     }
        // });

        // if (!member) {
        //     const error = new Error("ไม่พบข้อมูล");
        //     error.statusCode = 401
        //     throw error;
        // }

        // check password by bcryptjs   
        // const isMatch = await bcrypt.compare(password, req.member.password);
        // if (!isMatch) {
        //     const error = new Error("เหมือนรหัสผ่านเดิม");
        //     error.statusCode = 401
        //     throw error;
        // }


        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(new_password, salt);

        // update password
        await model.members.update({
            password: hashPassword,
        }, {
            where: {
                uuid: req.member.uuid
            }
        });

        res.status(200).json({
            message: 'แก้ไขรหัสผ่านสำเร็จ',
        });

    } catch (error) {
        next(error);
    }
}

