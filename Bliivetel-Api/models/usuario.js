module.exports = function (sequelize, DataTypes) {
  let Usuario = sequelize.define('Usuario', {
    email: {
      type: DataTypes.STRING(64),
      allowNull: false,
      defaultValue: '',
      unique: {
        args: true,
        msg: 'Email já existe'
      },
      validate: {
        notEmpty: {
          msg: 'Email deve ser preenchido'
        },
        isEmail: {
          msg: 'Email inválido'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [7, 25],
          msg: 'Senha deve conter de 7 a 25 caracteres'
        }
      }
    }
  }, {
      freezeTableName: true
    });

  Usuario.associate = function (models) {
    Usuario.hasMany(models.Sessao, {
      as: 'Sessao',
      foreignKey: {
        allowNull: false
      }
    });
  }
  return Usuario;
};
