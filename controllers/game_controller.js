const model = require('../models/index');
const config = require('../config/index');

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
