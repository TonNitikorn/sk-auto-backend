module.exports = (sequelize, DataTypes) => {
    const log_actions = sequelize.define("log_actions", {
        uuid: DataTypes.STRING(255),
        admins_uuid: DataTypes.STRING(255),
        actions: DataTypes.STRING(255),
        description: DataTypes.STRING(255),
        create_at: DataTypes.DATE,
      },
      {
        tableName: "log_actions",
        timestamps: false,
      },
  
    );
  
    log_actions.associate = (models) => {
      // associations can be defined here
    };
  

    
    return log_actions;
  
  };