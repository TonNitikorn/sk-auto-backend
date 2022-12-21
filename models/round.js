module.exports = (sequelize, DataTypes) => {
    const round = sequelize.define("round", {
        uuid: DataTypes.STRING(255),
        name: DataTypes.STRING(255),
        create_by: DataTypes.STRING(255),
        open_datetime: DataTypes.DATE,
        close_datetime: DataTypes.DATE,
        result: DataTypes.STRING(255),
        create_at: DataTypes.DATE,
        update_at: DataTypes.DATE,
      },
      {
        tableName: "round",
        timestamps: false,
      },
  
    );
  
    round.associate = (models) => {
      // associations can be defined here
    };
  

    
    return round;
  
  };