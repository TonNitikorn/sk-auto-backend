module.exports = (sequelize, DataTypes) => {
    const type_reward = sequelize.define("type_reward", {
        uuid: DataTypes.STRING(255),
        name: DataTypes.STRING(255),
        win_ratio: DataTypes.DECIMAL(10, 2),
      },
      {
        tableName: "type_reward",
        timestamps: false,
      },
  
    );
  
    type_reward.associate = (models) => {
      // associations can be defined here
    };
  
    
    return type_reward;
  
  };