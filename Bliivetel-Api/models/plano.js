module.exports = function (sequelize, DataTypes) {
  let Plano = sequelize.define('Plano', {
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '',
      validate: {
        notEmpty: {
          msg: 'Nome do plano deve ser preenchido'
        }
      }
    },
    minutos: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      validate: {
        notEmpty: {
          msg: 'Quantidade de minutos do plano deve ser preenchida'
        }
      }
    }
  }, {
      freezeTableName: true,
      timestamps: false
    });
  Plano.associate = function (models) {
    Plano.hasMany(models.Log, {
      as: 'Logs',
      foreignKey: {
        allowNull: false,
        name: 'PlanoId'
      }
    });
  }

  return Plano;
};
