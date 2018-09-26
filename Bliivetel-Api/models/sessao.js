module.exports = function (sequelize, DataTypes) {
  let Sessao = sequelize.define('Sessao', {
    token: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '',
      validate: {
        notEmpty: {
          msg: 'Token é obrigatório'
        }
      }
    }
  }, {
      freezeTableName: true
    });
  Sessao.associate = function (models) {
    Sessao.belongsTo(models.Usuario, {
      onDelete: 'CASCADE'
    })
  }
  return Sessao;
};
