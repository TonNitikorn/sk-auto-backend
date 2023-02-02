const config = require('../../config/index');
const { v4: uuidv4 } = require('uuid');
const model = require('../../models/index');

//get web_setting all exclude logo banner slide
exports.getWebSettingAll = async () => {
    const web_setting_data = await model.web_setting.findAll({
        attributes: { exclude: ['id', 'logo', 'banner', 'slide', 'prefix', 'create_at', 'update_at'] }
    })
    return web_setting_data
}
//get web_setting where type = logo
exports.getWebSettingLogo = async () => {
    const web_setting_data = await model.web_setting.findAll({
        where: {
            type: 'logo'
        },
        attributes: { exclude: ['id', 'logo', 'banner', 'slide', 'prefix', 'create_at', 'update_at'] },
    })
    return web_setting_data
    // const web_setting_data = await model.web_setting.findAll({
    //     attributes: { exclude: ['id', 'logo', 'banner', 'slide', 'prefix', 'create_at', 'update_at'] }
    // })
    // return web_setting_data
}