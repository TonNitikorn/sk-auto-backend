module.exports = (sequelize, DataTypes) => {
    const log_member = sequelize.define("log_member", {
        uuid: DataTypes.STRING(255),
        member_uuid: DataTypes.STRING(255),
        ip: DataTypes.STRING(255),
        create_at: DataTypes.DATE,
      },
      {
        tableName: "log_member",
        timestamps: false,
      },
  
    );
  
    log_member.associate = (models) => {
      // associations can be defined here
    };
  

    
    return log_member;
  
  };