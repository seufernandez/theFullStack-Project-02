const express = require("express");
const routes = express.Router(); // Router é responsável por fazer a varíavel ser responsavel pelas rotas
const captains = require("./app/controllers/captains");
const members = require("./app/controllers/members");

//Verbos HTTP
// GET: Receber uma RESOURCE
//POST: Criar um novo RESOURCE
//PUT : Atualizar RESOURCE
//DELETE: Deletar uma RESOURCE


routes.get("/", function (req, res) {
  return res.redirect("/captains");
});

//Rotas dos Captains
routes.get("/captains", captains.index);
routes.get("/captains/create", captains.create);
routes.get('/captains/:id', captains.show)
routes.get("/captains/:id", captains.show);
routes.get("/captains/:id/edit", captains.edit);
routes.post("/captains", captains.post); //usando tranquilamente as funções que coloquei no captains.js
routes.put("/captains", captains.put);
routes.delete("/captains", captains.delete)


//Rotas dos Members
routes.get("/members", members.index);
routes.get("/members", members.index);
routes.get("/members/create", members.create);
routes.get('/members/:id', members.show);
routes.get("/members/:id", members.show);
routes.get("/members/:id/edit", members.edit);
routes.post("/members", members.post); //usando tranquilamente as funções que coloquei no members.js
routes.put("/members", members.put);
routes.delete("/members", members.delete)


module.exports = routes;
