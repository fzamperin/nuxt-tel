const jwt = require('jsonwebtoken');
const jwtsecret = require('../config/secret')[process.env.NODE_ENV];
const db = require('../models');

module.exports = async (req, res, next) => {
  try {
    let token = req.headers.authorization.split(' ')[1];
    if (token) {
      jwt.verify(token, jwtsecret);

      let Usuario = await db.Usuario.findOne({
        include: [
          {
            model: db.Sessao,
            required: true,
            as: 'Sessao',
            where: {
              token: token
            }
          }
        ]
      });

      if(!Usuario)
        throw Error('Usuário ou sessão não existem');

      req.Usuario = Usuario;

      next();
    }
    else {
      throw Error('Forbidden');
    }

  } catch (err) {
    res.status(401).send({});
  }
};
