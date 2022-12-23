module.exports = (sequelize, DataTypes) => {
    const admins = sequelize.define("admins", {
        uuid: DataTypes.STRING(255),
        name: DataTypes.STRING(255),
        username: DataTypes.STRING(255),
        password: DataTypes.STRING(255),
        role: DataTypes.ENUM('OWNER','SUPPORT','SUPERADMIN','ADMIN','STAFF'),
        tel: DataTypes.STRING(255),
        status: DataTypes.ENUM('ACTIVE','INACTIVE'),
        preference: DataTypes.JSON,
        create_by: DataTypes.STRING(255),
        update_at: DataTypes.DATE,
        create_at: DataTypes.DATE,
      },
      {
        tableName: "admins",
        timestamps: false,
      },
  
    );
  
    admins.associate = (models) => {
      // associations can be defined here
    };
  

    
    return admins;
  
  };