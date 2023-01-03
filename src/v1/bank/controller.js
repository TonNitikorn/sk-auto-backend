// Description: Bank controller

const bankServices = require('./service');



//get bank list by type = deposit
exports.getBankList = async (req, res, next) => {
    try {
        
        const bank = await bankServices.getBankList();
       
    
        res.status(200).json(
             bank
        );

    } catch (error) {
        next(error);
    }
}
