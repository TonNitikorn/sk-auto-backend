"use strict";
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const config = require('../config/index')

module.exports = (sequelize, DataTypes) => {
  const members = sequelize.define("members", {
      uuid: DataTypes.STRING(255),
      name: DataTypes.STRING(255),
      bank_name: DataTypes.STRING(255),
      bank_number: DataTypes.DECIMAL(10,2),
      tel: DataTypes.STRING(255),
      line_id: DataTypes.STRING(255),
      platform: DataTypes.STRING(255),
      username: DataTypes.STRING(255),
      password: DataTypes.STRING(255),
      create_by: DataTypes.STRING(255),
      affiliate_by: DataTypes.STRING(255),
      points: DataTypes.STRING(255),
      rank: DataTypes.STRING(255),
      status: DataTypes.ENUM('ACTIVE','INACTIVE'),
      is_new: DataTypes.ENUM('TRUE','FALSE'),
      point_affiliate: DataTypes.STRING(255),
      create_at: DataTypes.DATE,
      update_at: DataTypes.DATE,
    },
    {
      tableName: "members",
      timestamps: false,
    },

  );

  members.associate = (models) => {
    // associations can be defined here
  };

  

//   // เข้ารหัส Password
//   members.encryptPassword = async function(password) {
//     const salt = await bcrypt.genSalt(5);
//     const hashPassword = await bcrypt.hash(password, salt);
//     return hashPassword;
//  }

//   // เช็ค Password
//   members.prototype.checkPassword = async (password, hashPassword) => {
//     const isValid = await bcrypt.compare(password, hashPassword);
//     return isValid;
//   };

  
  return members;

};