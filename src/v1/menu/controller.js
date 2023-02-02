const model = require('../../models/index');
const config = require('../../config/index');
//service
const service = require('./service');

//get game_type
exports.getGameType = async (req, res, next) => {
    try {
        const gameType = await model.game_type.findAll({
            attributes: { exclude: ['update_at','id'] },
            include: [
                {
                    model: model.sub_game_type,
                    attributes: { exclude: ['update_at','id'] },
                    as: 'sub_game_type'
                }]

        });

        res.status(200).json(
            gameType
        );

    } catch (error) {
        next(error);
    }
}

exports.getWebSettingAll = async(req, res, next) => {
    try {
        let data = req.body;
        let admin = req.admin;
        //get game_type on service
        const web_setting_data = await service.getWebSettingAll(data,admin);
        res.status(201).json(web_setting_data)
    }
    catch (error) {
        next(error);
     }
}

//get web_setting where type = 'logo'
exports.getWebSettingLogo = async (req, res, next) => {
    try {
        let data = req.body;
        let admin = req.admin;
        //get game_type on service
        const web_setting_data = await service.getWebSettingLogo(data,admin);
        res.status(201).json(web_setting_data)
    } catch (error) {
        next(error);
    }
}



