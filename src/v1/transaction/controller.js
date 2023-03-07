//import service
const transactionServices = require('./service');

//create withdraw request
exports.createWithdrawRequest = async (req, res, next) => {
    try {
        const data = req.body;
        const username = req.member.username;
        console.log('username :>> ', req.member);
        const member = await transactionServices.createWithdrawRequest(data, username);
        res.status(200).json(
            {
                message: 'Success',
            }
        );
    } catch (error) {
        next(error);
    }
}

//get transaction history by member.uuid
exports.getTransactionHistory = async (req, res, next) => {
    try {
        const uuid = req.member.uuid;
        const transaction = await transactionServices.getTransactionHistory(uuid);
        res.status(200).json(transaction);
    } catch (error) {
        next(error);
    }
}
