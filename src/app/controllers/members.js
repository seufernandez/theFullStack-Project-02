const { age, date } = require("../../lib/utilities");

const Member = require("../models/Member")


module.exports = {
    
  index(req, res) {
                            //recebendo o results.rows e traduzindo para members
    Member.all(function (members) {
      return res.render("members/index", { members });//enviadno os dados do db para o njk
    })

  },      


  create(req, res) {
    return res.render("members/create");
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
                      //enviando os dados e recebendo um member, pois está recebendo somente 1
    Member.create(req.body, function(member) {
   
      return res.redirect (`/members/${member.id}`) // results sempre vai retornar um row, então vamos pegar na posição 0 o id

    })



  },


  show(req, res) {


    // já sabe que precisaŕa enviar um id, então req.params.id
    Member.find(req.params.id, function(member){

      if (!member) return res.send("Member not found :/ 404");

      return res.render('members/show', {member})
    })

    return


  },


  edit(req, res) {

    Member.find(req.params.id, function(member){
      
      if (!member) return res.send("Member not found :/ 404");

      return res.render('members/edit', {member})
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


      Member.update(req.body, function(){
        return res.redirect(`/members/${req.body.id}`)
      })
      
  },


  delete(req, res) {
    Member.delete(req.body.id, function(){
      return res.redirect(`/members`)
    })
    
    return
  },


}
