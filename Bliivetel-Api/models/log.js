module.exports = function (sequelize, DataTypes) {
  let Log = sequelize.define('Log', {
    minutos: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      validate: {
        isMaiorQueZero(minutos) {
          if(minutos <= 0) {
            throw Error('Quantidade de minutos inválida')
          }
        }
      }
    }
  }, {
      freezeTableName: true
    });

  Log.associate = function(models) {
    Log.belongsTo(models.Plano);
    Log.belongsTo(models.Origem_destino, {
      foreignKey: {
        name: 'Origem_destinoId'
      }
    });
  }

  return Log;
};
