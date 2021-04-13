// Pool é um jeito de verificar se o usuário/maquina/server tem autorizaçõ de continuar as querys no banco de dados
const { Pool } = require('pg')

module.exports = new Pool({
    user: 'frnndz',
    password: '',
    host:'localhost',
    port: '5432',
    database:'spaceship'
})// assim o node e o pool vai saber certinho que eu tenho as credênciais para entrar nesse banco de dados e rodar as querys