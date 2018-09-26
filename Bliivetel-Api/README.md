# Nuxt-Tel Api

> Projeto API no Nuxt-Tel, o projeto tem um form de cálculos telefônicos onde é possível depois visualizar os logs das consultas.

### O projeto contém:
* Express;
* Sequelize;
* JWT;
* Bcrypt;
* Testes automatizados com Code Coverage;

## Como rodar o projeto

``` bash
# Instalar dependências
$ npm install

# Configurar o NODE_ENV corretamente para pegar a config específica no arquivo database.js, sugiro usar NODE_END = localhost
# Caso seja necessário alterar a configuração do ambiente específico para poder apontar para o banco corretamente
# Para criar o banco com o nome corretamente rodar o comando no bash:
$ ./node_modules/.bin/sequelize db:create

# Executar o gulp específico para criar as tabelas e a estrutura do banco (caso não tenha gulp, favor instalar):
$ gulp sequelize:drop

# Depois executar os seeds para poder inserir um usuário de teste, as origens e destinos e os planos
$ ./node_modules/.bin/sequelize db:seed:all

# Executar o Live reload, se o banco não for configurado corretamente o cliente não funcionará pois ele usa SSR
$ npm run dev

# Ao rodar os testes será gerado a pasta coverage com a página HTML contendo o code coverage do projeto.
# Para rodar os testes:
$ npm run test
```


## Diretórios do projeto
* Bin: Entry point do projeto onde tudo começa;
* Config: Configuração básica do projeto de banco e de secret JWT;
* Coverage: Página HTML gerada pelo istanbul referente aos testes rodados;
* Middleware: Contém os middlewares, no caso deste projeto somente o middleware de autenticação;
* Models: Contém os objetos que mapeiam o banco de dados, sendo cada model referente a uma tabela do banco;
* Routes: Pasta contendo as rotas do projeto;
* Seeders: Pasta que contém os arquivos seeders responsáveis por gerar informações extras no banco;

> O projeto foi feito para rodar no localhost utilizando a porta 3001, o seu cliente utiliza a porta 3000;

Desenvolvido por Fernando Augusto Zamperin Penna @ OniQ Tecnologia
