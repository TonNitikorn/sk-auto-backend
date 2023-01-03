const model = require('../../models/index');

//get bank list by type = deposit
exports.getBankList = async (req, res, next) => {

    const bank = await model.banks.findAll({
        where: {
            type: 'deposit'
        },
        attributes: { exclude: ['id', 'update_at'] }
    });


    //return bank list
    return bank
}



