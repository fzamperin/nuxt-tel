const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const jwtsecret = require('../config/secret')[process.env.NODE_ENV];
const authMid = require('../middleware/auth');

const db = require('../models');

router.get('/init', async (req, res) => {
  try {
    let Origens = await db.Origem_destino.findAll({
      group: ['origem'],
      attributes: ['origem']
    });

    let Origens_destino = await db.Origem_destino.findAll({});

    let Planos = await db.Plano.findAll({});

    res.status(200).send({
      Origens: Origens,
      Origens_destino: Origens_destino,
      Planos: Planos
    });

  } catch (err) {
    res.status(400).send({
      message: err.message
    })
  }
});

router.get('/me', authMid, async(req, res, next) => {
  try {

    req.Usuario.senha = undefined;
    req.Usuario.Sessao = undefined;

    res.status(200).send(req.Usuario);
  }
  catch(err) {
    res.status(400).send({
      message: err.message
    })
  }
})

// Register Log
router.post('/log', async (req, res) => {
  try {

    let Origem_destino = await db.Origem_destino.findOne({
      attributes: ['id'],
      where: {
        origem: req.body.Origem,
        destino: req.body.Destino
      }
    })

    let Log = db.Log.build({
      minutos: req.body.minutos,
      Origem_destinoId: Origem_destino.id,
      PlanoId: req.body.Plano
    })

    await Log.save({});

    Log = await db.Log.findById(Log.id, {
      include: [
        {
          model: db.Plano,
          required: true
        },
        {
          model: db.Origem_destino,
          required: true
        },
      ]
    })

    res.status(200).send(Log);
  }
  catch(err) {
    res.status(400).send({
      message: err.message
    })
  }
});

// Logs
router.get('/logs', authMid, async (req, res, next) => {
  try {

    let Logs = await db.Log.findAll({
      include: [
        {
          model: db.Plano,
          required: true
        },
        {
          model: db.Origem_destino,
          required: true
        },
      ]
    });

    res.status(200).send(Logs);
  }
  catch(err) {
    res.status(400).send({
      message: err.message
    })
  }
})

router.post('/login', async (req, res) => {
  try {
    let Usuario = await db.Usuario.findOne({
      where: {
        email: req.body.email
      }
    });

    if(!Usuario)
      throw Error('Usuário não encontrado!');

    await bcrypt.compare(req.body.password, Usuario.password);

    let token = jwt.sign({ email: Usuario.email }, jwtsecret, { issuer: 'BliiveTel' });

    await db.Sessao.create({
      token: token,
      UsuarioId: Usuario.id
    })

    res.status(200).send({
      token: token,
      Usuario: Usuario
    })
  }
  catch(err) {
    res.status(400).send({
      message: err.message
    })
  }
});

router.delete('/logout', async (req, res) => {
  try {
    if(!req.headers.authorization) {
      return res.status(200).send({});
    }
    let token = req.headers.authorization.split(' ')[1];

    await db.Sessao.destroy({
      where: {
        token: token
      }
    })

    res.status(200).send({});
  }
  catch(err) {
    console.log(err);
    res.status(400).send({
      message: err.message
    })
  }
});

module.exports = router;
