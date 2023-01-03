module.exports = (sequelize, DataTypes) => {
    const affiliate_setting = sequelize.define("affiliate_setting", {
        uuid: DataTypes.STRING(255),
        type_setting:  DataTypes.ENUM('PERCENT','FIX'),
        type_affiliate: DataTypes.ENUM('TURN','DEPOSIT'),
        max: DataTypes.JSON,   
        update_at: DataTypes.DATE,
        create_at: DataTypes.DATE,
      },
      {
        tableName: "affiliate_setting",
        timestamps: false,
      },
  
    );
  
    affiliate_setting.associate = (models) => {
      // associations can be defined here
    };
  

    
    return affiliate_setting;
  
  };