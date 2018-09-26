const describe = require('mocha').describe;
const it = require('mocha').it;
const after = require('mocha').after;
const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');

// Importa o servidor para realizar as chamadas
const app = require('../app');
const db = require('../models');

db.sequelize.options.logging = false;

chai.use(chaiHttp);

describe('Testando todas as funcionalidades do sistema BliiveTel', () => {

  before(() => {
    this.data = {};
  })

  it('Deve enviar as informações ao usuário para inserir uma nova consulta de preço no sistema', done => {
    chai.request(app).get('/init').end((err, res) => {
      expect(err).to.be.null;
      expect(res).to.have.status(200);
      expect(res).to.have.property('body');
      expect(res.body).to.be.an('object');
      expect(res.body.Origens).to.be.an('array');
      expect(res.body.Origens_destino).to.be.an('array');
      expect(res.body.Planos).to.be.an('array');
      done();
    })
  })

  it('Deve criar um novo registro na tabela de log', done => {
    let log = {
      Origem: '011',
      Destino: '017',
      Plano: 1,
      minutos: 80
    }
    chai.request(app).post('/log').send(log).end((err, res) => {
      expect(err).to.be.null;
      expect(res).to.have.status(200);
      expect(res).to.have.property('body');
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('id');
      expect(res.body).to.have.property('createdAt');
      expect(res.body).to.have.property('updatedAt');
      expect(res.body).to.have.property('minutos');
      expect(res.body).to.have.property('PlanoId');
      expect(res.body).to.have.property('Origem_destinoId');
      db.Log.findById(res.body.id).then(result => {
        if(result.id === res.body.id) {
          done();
        }
        else {
          done('Objeto não inserido no banco de dados!');
        }
      }, err => {
        done(err);
      })
    })
  })

  it('Deve dar erro mínutos inválidos ao criar um novo registro na tabela de log', done => {
    let log = {
      Origem: '011',
      Destino: '017',
      Plano: 1,
      minutos: 0
    }
    chai.request(app).post('/log').send(log).end((err, res) => {
      expect(err).to.be.null;
      expect(res).to.have.status(400);
      expect(res).to.have.property('body');
      expect(res.body.message).to.be.an('string');
      expect(res.body.message).to.have.string('Quantidade de minutos inválida');
      done();
    })
  })

  it('Deve logar corretamente com o usuário padrão do sistema', done => {
    let login = {
      email: 'teste@bliive.com.br',
      password: '1234567890'
    }
    chai.request(app).post('/login').send(login).end((err, res) => {
      expect(err).to.be.null;
      expect(res).to.have.status(200);
      expect(res).to.have.property('body');
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('token');
      expect(res.body.token).to.be.a('string');
      expect(res.body).to.have.property('Usuario');
      expect(res.body.Usuario).to.be.an('object');
      this.data.token = res.body.token;
      db.Sessao.findOne({
        where: {
          token: res.body.token
        }
      }).then(sessao => {
        if(sessao.token === res.body.token) {
          token = res.body.token;
          done();
        }
        else {
          done('Token não cadastrado no sistema');
        }
      }, err => {
        done(err)
      })
    })
  })

  it('Deve consultar a lista de logs do sistema estando logado', done => {
    chai.request(app).get('/logs').set('authorization', 'Bearer ' + this.data.token).end((err, res) => {
      expect(err).to.be.null;
      expect(res).to.have.status(200);
      expect(res).to.have.property('body');
      expect(res.body).to.be.an('array');
      done();
    })
  })

  it('Deve retornar o erro usuário não encontrado ao logar com um usuário inexistente', done => {
    let login = {
      email: 'naoexiste@bliive.com.br',
      password: '1234567890'
    }
    chai.request(app).post('/login').send(login).end((err, res) => {
      expect(res).to.have.status(400);
      expect(res).to.have.property('body');
      expect(res.body).to.have.property('message');
      expect(res.body.message).to.be.a('string');
      expect(res.body.message).to.have.string('Usuário não encontrado!');
      done();
    })
  })

  it('Tenta consultar a lista sem estar logado no sistema', done => {
    chai.request(app).get('/logs').end((err, res) => {
      expect(res).to.have.status(401);
      done();
    })
  })

  it('Deve realizar o logout da aplicação', done => {
    chai.request(app).delete('/logout').set('authorization', 'Bearer' + this.data.token).end((err, res) => {
      expect(err).to.be.null;
      expect(res).to.have.status(200);
      done();
    })
  })



})
