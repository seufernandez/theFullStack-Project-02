const express = require("express"); // require = funcao do js para trazer uma dependência pra dentro da variável
const nunjucks = require('nunjucks');
const routes = require('./routes')
const methodOverride = require('method-override')

const server = express() // a variável virou uma função

server.use(express.urlencoded({extended: true})) // vai fzer funcionar o res.body; pois antes o submit era acionado, a página ia para o req.body mas não aparecia nada; agora todos as informações que foram dadas para criar um novo membro se organizam na pagina em formato de objeto


//trazendo o css pelo server 
server.use(express.static('public'))// vai observar a pasta public para servir os arquivos estáticos
server.use(methodOverride('_method'))
server.use(routes)

//Configurando a Template Engine
server.set("view engine", "njk")// tipo de motor de view = motor de view para tudo que for njk


nunjucks.configure("src/app/views", { //cofigurando o caminho; de onde ele vai buscar o arquivo
    express: server, // Opção diz que vai usar o express e está usando a variavel server para isso.
    autoescape:false, // para o nunjucks não colocar no texto uma tag que seria colocada no meio do texto, ex: estava colocando p html ao invés de colocar somente o textcontent
    noChache: true // limpar o cache sempre, pra nao manter no navegador informações desatualizadas
})



// server vai ficar escutando a porta 5000
server.listen(5000, function(){ // a função vai ser executada assim que escutar o server pelo npm start
    console.log("SERVER TA NAICE");
})
