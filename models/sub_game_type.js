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
      // associations can be defined here
    };
  

    
    return sub_game_type;
  
  };