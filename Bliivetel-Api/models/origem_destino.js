module.exports = function (sequelize, DataTypes) {
  let Origem_destino = sequelize.define('Origem_destino', {
    origem: {
      type: DataTypes.STRING,
      allowNull: false
    },
    destino: {
      type: DataTypes.STRING,
      allowNull: false
    },
    valorminuto: {
      type: DataTypes.FLOAT,
      allowNull: false
    }
  }, {
      freezeTableName: true,
      timestamps: false,
      indexes: [
        {
          unique: true,
          name: 'destino_origem',
          fields: ['origem', 'destino']
        }
      ]
    });
  Origem_destino.associate = function (models) {
    Origem_destino.hasMany(models.Log, {
      as: 'Logs',
      foreignKey: {
        allowNull: false,
        name: 'Origem_destinoId'
      }
    })
  }
  return Origem_destino;
};
