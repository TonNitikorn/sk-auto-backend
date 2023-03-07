const model = require('../../models/index');
const { v4: uuidv4 } = require('uuid');
const Op = require("sequelize").Op;
const sequelize = require('sequelize');
const bcrypt = require('bcryptjs');

//create withdraw request
exports.createWithdrawRequest = async (data, username) => {
    //check model member is null

    if (!username || !data.amount) {
        const error = new Error("กรุณากรอกข้อมูลให้ครบถ้วน");
        error.statusCode = 400
        throw error;
    }

    //check amount is not 0
    if (data.amount == 0) {
        const error = new Error("จำนวนเงินไม่ถูกต้อง");
        error.statusCode = 400
        throw error;
    }

    //check amount is not negative
    if (data.amount < 0) {
        const error = new Error("จำนวนเงินไม่ถูกต้อง");
        error.statusCode = 400
        throw error;
    }

    //check member is exist
    const member = await model.members.findOne({
        where: {
            username: username
        },
        //exclude password
        attributes: {
            exclude: ['password', 'id']
        }

    });
    if (!member) {
        const error = new Error("ไม่พบสมาชิก");
        error.statusCode = 400
        throw error;
    }

    //check member credit is enough
    if (member.credit < parseFloat(data.amount)) {
        const error = new Error("เครดิตไม่เพียงพอ");
        error.statusCode = 400
        throw error;
    }

    // const transaction_record = await model.transaction.findAll({
    //     limit: 1,
    //     order: [
    //         ['update_at', 'DESC']
    //     ]
    // });
    //get bank by uuid
    const bank = await model.banks.findOne({
        where: {
            uuid: data.by_bank
        }
    });
    //create withdraw request
    const transaction = await model.transaction.create({
        uuid: uuidv4(),
        credit: data.amount,
        credit_before: member.credit,
        credit_after: parseFloat(member.credit) - parseFloat(data.amount),
        amount:0,
        amount_before: 0,
        amount_after: 0,
        transfer_by: "admin.username",
        transfer_type: "WITHDRAW",
        status_transction: 'APPROVE',
        status_provider: 'SUCCESS',
        status_bank: 'SUCCESS',
        content: data.content,
        member_uuid: member.uuid,
        detail: '-',
        detail_bank: '-',
        slip: '-',
        by_bank:0,
        create_at: new Date(),
        update_at: new Date()
    });

    await model.members.update({
        credit: parseFloat(member.credit) - parseFloat(data.amount)
    }, {
        where: {
            uuid: member.uuid
        }
    });
    // //create log_actions
    // await model.log_actions.create({
    //     uuid: uuidv4(),
    //     admins_uuid: admin.uuid,
    //     actions: 'create_withdraw_request',
    //     description: data,
    //     create_at: new Date(),
    // });

    //return withdraw_request
    return { transaction, member }
}
//getTransactionHistory by member_uuid
exports.getTransactionHistory = async (member_uuid) => {
    const transaction = await model.transaction.findAll({
        where: {
            member_uuid: member_uuid
        },
        order: [
            ['update_at', 'DESC']
        ]
    });
    return transaction;
}
