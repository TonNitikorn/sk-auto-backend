module.exports = (sequelize, DataTypes) => {
  const betting = sequelize.define("betting", {
      uuid: DataTypes.STRING(255),
      member_uuid: DataTypes.STRING(255),
      bet_round_uuid: DataTypes.STRING(255),
      bet_type: DataTypes.INTEGER,
      bet_price: DataTypes.STRING(255),
      bet_status: DataTypes.ENUM('pendding', 'success'),
      bet_number: DataTypes.JSON,
      bet_count: DataTypes.STRING(255),
      bet_win_price: DataTypes.STRING(255),
      create_at: DataTypes.DATE,
    }, {
      tableName: "bet",
      timestamps: false,
    },

  );

  betting.associate = (models) => {
    // associations can be defined here
    models.betting.hasOne(models.type_reward, {
      foreignKey: 'id',
      sourceKey: 'bet_type'
    });
    models.betting.hasOne(models.round, {
      foreignKey: 'uuid',
      sourceKey: 'bet_round_uuid'
    });

  };


  return betting;

};