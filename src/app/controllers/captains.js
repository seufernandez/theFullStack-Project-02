// se caso fosse nescessário o uso de data de aniversário utilizaria o comando abaixo para trazer a calculadora de idade porém a Obra de Douglas Adams não menciona tais origens dos personagens com tantos detalhes
const Captain = require("../models/Captain")
const { age, date } = require("../../lib/utilities");

module.exports = {
    
  index(req, res) {
                            //recebendo o results.rows e traduzindo para captains
    Captain.all(function (captains) {
      return res.render("captains/index", { captains });//enviadno os dados do db para o njk
    })

  },      


  create(req, res) {
    return res.render("captains/create");
  },


  post(req, res) {


    //VALIDAÇÃO==========================================
    const keys = Object.keys(req.body);

    //CHECANDO SE OS CAMPOS ESTÃO VAZIOS
    for (key of keys) {
      //req.body.avatar_url
      var theKey = key;

      if (req.body[key] == "") {
        //escrever isso é o mesmo que escrever o que está acima
        return res.send(
          `I know I maybe sound like a vogon but the following fields needs to be filed: "${theKey}" field`
        );
      }
    }
                      //enviando os dados e recebendo um captain, pois está recebendo somente 1
    Captain.create(req.body, function(captain) {
   
      return res.redirect (`/captains/${captain.id}`) // results sempre vai retornar um row, então vamos pegar na posição 0 o id

    })



  },


  show(req, res) {


    // já sabe que precisaŕa enviar um id, então req.params.id
    Captain.find(req.params.id, function(captain){
      if (!captain) return res.send("Captain not found :/ 404");

      //configurando o que eu já há nos captains
      captain.services = captain.services.split(",")

      captain.created_at = date(captain.created_at).format// exportando no formato format do utillities

      return res.render('captains/show', {captain})
    })

    return


  },


  edit(req, res) {

    Captain.find(req.params.id, function(captain){
      if (!captain) return res.send("Captain not found :/ 404");


      captain.created_at = date(captain.created_at).format// exportando no formato format do utillities

      return res.render('captains/edit', {captain})
    })

    return
  },


  put(req, res) {

      //VALIDAÇÃO==========================================
      const keys = Object.keys(req.body);

      //CHECANDO SE OS CAMPOS ESTÃO VAZIOS
      for (key of keys) {
        //req.body.avatar_url
        var theKey = key;
  
        if (req.body[key] == "") {
          //escrever isso é o mesmo que escrever o que está acima
          return res.send(
            `I know I maybe sound like a vogon but the following fields needs to be filed: "${theKey}" field`
          );
        }
      }


      Captain.update(req.body, function(){
        return res.redirect(`/captains/${req.body.id}`)
      })
      
  },


  delete(req, res) {
    Captain.delete(req.body.id, function(){
      return res.redirect(`/captains`)
    })
    
    return
  },


}