module.exports = (sequelize, DataTypes) => {
    const web_setting = sequelize.define("web_setting", {
        uuid: DataTypes.STRING(255),
        logo:  DataTypes.JSON,   
        banner: DataTypes.JSON,   
        slide: DataTypes.JSON,   
        update_at: DataTypes.DATE,
        create_at: DataTypes.DATE,
      },
      {
        tableName: "web_setting",
        timestamps: false,
      },
  
    );
  
    web_setting.associate = (models) => {
      // associations can be defined here
    };
  

    
    return web_setting;
  
  };