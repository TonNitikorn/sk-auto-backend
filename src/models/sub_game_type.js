module.exports = (sequelize, DataTypes) => {
    const sub_game_type = sequelize.define("sub_game_type", {
        uuid: DataTypes.STRING(255),
        game_type_uuid: DataTypes.STRING(255),
        game_name: DataTypes.STRING(255),
        game_id: DataTypes.STRING(255),
        game_icon: DataTypes.JSON,
        update_at: DataTypes.DATE,
        create_at: DataTypes.DATE,
    },
        {
            tableName: "sub_game_type",
            timestamps: false,
        },

    );

    sub_game_type.associate = (models) => {
       //associate with uuid game_type
        // sub_game_type.belongsTo(models.game_type, {
        //     foreignKey: 'game_type_uuid',
        //     targetKey: 'uuid',
        //     as: 'game_type'
        // });

    };



    return sub_game_type;

};