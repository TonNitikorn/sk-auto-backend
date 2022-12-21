module.exports = (sequelize, DataTypes) => {
    const transaction = sequelize.define("transaction", {
        uuid: DataTypes.STRING(255),
        member_uuid: DataTypes.STRING(255),
        type: DataTypes.ENUM('DEPOSIT', 'WITHDRAW', 'BET', 'REWARD'),
        tranfer_by: DataTypes.STRING(255),
        tranfer_type: DataTypes.ENUM('MANUAL', 'AUTO'),
        amount: DataTypes.STRING(255),
        remaining_balance: DataTypes.DECIMAL(10,2),
        create_at: DataTypes.DATE,
      },
      {
        tableName: "transaction",
        timestamps: false,
      },
  
    );
  
    transaction.associate = (models) => {
      // associations can be defined here
    };
  
  
    
    return transaction;
  
  };