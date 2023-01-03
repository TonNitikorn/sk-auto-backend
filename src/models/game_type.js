module.exports = (sequelize, DataTypes) => {
    const game_type = sequelize.define("game_type", {
        uuid: DataTypes.STRING(255),
        type_name_th: DataTypes.STRING(255),
        type_logo: DataTypes.STRING(255),
        type_name_eng: DataTypes.STRING(255),
        type_name_eng: DataTypes.STRING(255),
        update_at: DataTypes.DATE,
        create_at: DataTypes.DATE,
      },
      {
        tableName: "game_type",
        timestamps: false,
      },
  
    );
  
    game_type.associate = (models) => {
        //associate with uuid sub_game_type
        game_type.hasMany(models.sub_game_type, {
            foreignKey: 'game_type_uuid',
            sourceKey: 'uuid',
            as: 'sub_game_type'
        });
        
       
        
    };
  

    
    return game_type;
  
  };