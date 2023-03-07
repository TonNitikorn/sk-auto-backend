module.exports = (sequelize, DataTypes) => {
  const transaction = sequelize.define("transaction", {
    uuid: DataTypes.STRING(255),
    credit: DataTypes.DECIMAL(10, 2),
    credit_before: DataTypes.DECIMAL(10, 2),
    credit_after: DataTypes.DECIMAL(10, 2),
    amount: DataTypes.DECIMAL(10, 2),
    amount_before: DataTypes.DECIMAL(10, 2),
    amount_after: DataTypes.DECIMAL(10, 2),
    point: DataTypes.DECIMAL(10, 2),
    point_before: DataTypes.DECIMAL(10, 2),
    point_after: DataTypes.DECIMAL(10, 2),
    affiliate_point: DataTypes.DECIMAL(10, 2),
    affiliate_point_before: DataTypes.DECIMAL(10, 2),
    affiliate_point_after: DataTypes.DECIMAL(10, 2),
    transfer_by: DataTypes.STRING(255),
    transfer_type: DataTypes.ENUM('DEPOSIT', 'WITHDRAW'),
    status_transction: DataTypes.ENUM('CREATE', 'APPROVE', 'PENDING', 'SUCCESS', 'CANCEL', 'FAIL', 'MANUAL'),
    status_provider: DataTypes.ENUM('PENDING', 'SUCCESS', 'FAIL'),
    status_bank: DataTypes.ENUM('PENDING', 'SUCCESS', 'FAIL'),
    content: DataTypes.STRING(255),
    member_uuid: DataTypes.STRING(255),
    detail: DataTypes.STRING(255),
    detail_bank: DataTypes.STRING(255),
    by_bank: DataTypes.STRING(255),
    slip: DataTypes.STRING(255),
    create_at: DataTypes.DATE,
    update_at: DataTypes.DATE,
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