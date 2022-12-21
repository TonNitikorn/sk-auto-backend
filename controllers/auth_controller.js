const model = require('../models/index');
const config = require('../config/index');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');

// login with jwt token 
exports.login = async (req, res, next) => {
    try {
        const { username, password } = req.body;

        //check username and password is null
        if (!username || !password) {
            return res.status(400).json({
                message: 'ข้อมูลไม่ถูกต้อง'
            });
        }

        const member = await model.member.findOne({
            where: {
                username : username
            }
        });

        if (!member) {
            const error = new Error("Username หรือ Password ไม่ถูกต้อง");
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
        if (member.status !== 'active') {
            const error = new Error("บัญชีของคุณถูกระงับ");
            error.statusCode = 401
            throw error;
        }
        // log login in log table   
        let ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        // check ip one ip
        if (ip.split(',').length > 0) {
            ip = ip.split(',')[0];
        }

        await model.log_member.create({
            uuid: uuidv4(),
            member_uuid: member.uuid,
            ip: ip,
            create_at: new Date(),
        });

        //create jwt token
        const token = jwt.sign({ uuid: member.uuid,}, config.JWT_KEY, { expiresIn: config.JWT_EXP});
        // const expiresin = jwt.decode(token).exp;

        res.status(200).json({
            message: 'Login success',
            accesstoken: token,
            type : 'Bearer',
        });

    } catch (error) {
        next(error);
    }
}


// register with jwt token bcryptjs
exports.register = async (req, res, next) => {
    try {
        const { username, password, info_name, tel , credit} = req.body;

        if (!username || !password || !info_name || !tel) {
            const error = new Error("Invalid data");
            error.statusCode = 400;
            throw error;
        }

        const exisUsername = await model.member.findOne({
            where: { 
                username: username,
            },
        });
        if (exisUsername) {
            const error = new Error("Invalid username");
            error.statusCode = 400;
            throw error;
        }

        //hash password
        const salt = await bcrypt.genSalt(config.SALT);
        const hashedPassword = await bcrypt.hash(password, salt);


        const member = await model.member.create({
            uuid: uuidv4(),
            username: username,
            password: hashedPassword,
            info_name: info_name,
            tel: tel,
            credit: credit || 0,
            status: 'active',
            create_at: new Date(),
            update_at: new Date(),
        });

        res.status(201).json({
            message: 'Register success',
        });
    } catch (error) {
        next(error);
    }
}
