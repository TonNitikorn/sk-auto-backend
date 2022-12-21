"use strict";
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const config = require('../config/index')

module.exports = (sequelize, DataTypes) => {
  const member = sequelize.define("member", {
      uuid: DataTypes.STRING(255),
      username: DataTypes.STRING(255),
      password: DataTypes.STRING(255),
      credit: DataTypes.DECIMAL(10,2),
      tel: DataTypes.STRING(255),
      info_name: DataTypes.STRING(255),
      status: DataTypes.ENUM("active", "inactive"),
      create_at: DataTypes.DATE,
      update_at: DataTypes.DATE,
    },
    {
      tableName: "members",
      timestamps: false,
    },

  );

  member.associate = (models) => {
    // associations can be defined here
  };

  

//   // เข้ารหัส Password
//   Member.encryptPassword = async function(password) {
//     const salt = await bcrypt.genSalt(5);
//     const hashPassword = await bcrypt.hash(password, salt);
//     return hashPassword;
//  }

//   // เช็ค Password
//   Member.prototype.checkPassword = async (password, hashPassword) => {
//     const isValid = await bcrypt.compare(password, hashPassword);
//     return isValid;
//   };

  
  return member;

};