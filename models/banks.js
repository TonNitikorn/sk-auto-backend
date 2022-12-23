module.exports = (sequelize, DataTypes) => {
    const banks = sequelize.define("banks", {
        uuid: DataTypes.STRING(255),
        bank_no: DataTypes.STRING(255),
        bank_number: DataTypes.STRING(255),
        bank_name: DataTypes.STRING(255),
        bank_account_name: DataTypes.STRING(255),
        bank_total: DataTypes.DECIMAL(10,2),
        type: DataTypes.STRING(255),
        tel: DataTypes.STRING(255),
        birthdate: DataTypes.DATE,
        pin: DataTypes.STRING(255),
        device_id: DataTypes.STRING(255),
        status: DataTypes.ENUM('ACTIVE','INACTIVE'),
        sub_type: DataTypes.ENUM('SMS','APP'),
        is_decimal: DataTypes.ENUM('TRUE','FALSE'),
        username_ibanking: DataTypes.STRING(255),
        password_ibanking: DataTypes.STRING(255),
        qr_code: DataTypes.STRING(255),
        status_system: DataTypes.ENUM('FAILED','RUNNING','CLOSE'),
        update_at: DataTypes.DATE,
        create_at: DataTypes.DATE,
      },
      {
        tableName: "banks",
        timestamps: false,
      },
  
    );
  
    banks.associate = (models) => {
      // associations can be defined here
    };
  

    
    return banks;
  
  };