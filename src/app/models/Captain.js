const { age, date } = require("../../lib/utilities");

const db = require("../../config/db")



module.exports = {
    //seleciona todos os instrutores
    all(callback) {
        //Colocando todos os instrutores, junto com o numero de convidados que tem os mesmos
        db.query(`SELECT captains.*, count(members) AS total_guests
        FROM captains 
        LEFT JOIN members ON (members.captain_id = captains.id)
        GROUP BY captains.id
        ORDER BY total_guests DESC`, function (err,results) {//`SELECT * FROM captains`, pegando todos os campos daquela tabela no banco de dados
            if (err) throw "Database Error"
            
            callback(results.rows)// enviando os dados como parametro
        })

    },
    //criando novo (post)
    create(data, callback) {


        //fazendo a query usando template string com a função de inserir dados, tabela já criada
        const query = `
            INSERT INTO captains (
                name,
                avatar_url,
                ocupation,
                origin,
                services,
                created_at
            )   VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING id
        `; //assim que ele rodar e cadastrar no banco ele irá me retornar um id

        //criando array que será utilizado para substituir o splaceholders, "$1, $2, $3, $4, $5, $6"
        const values = [
            data.name,
            data.avatar_url,
            data.ocupation,
            data.origin,
            data.services,
            date(Date.now()).iso, //created_at no formato iso
        ];
                            //callback function
        db.query(query, values, function(err,results) {
            if (err) throw `Database error! ${err}`

            callback(results.rows[0])
        })

    },
    find(id, callback) {
        //'filtrando'
        db.query(`SELECT * 
                FROM captains 
                WHERE id = $1`, [id], function(err, results) {
                    //not res.send pois não há res declarado
                    if (err) throw `Database Error!${err}`

                    //pegando somente o primeiro registro
                    callback(results.rows[0])
        })
    },
    findBy(filter, callback) {
        //Colocando todos os instrutores requisitados pelo filter, usando o nome ou a ocupação
        db.query(`SELECT captains.*, count(members) AS total_guests
                FROM captains 
                LEFT JOIN members ON (members.captain_id = captains.id)
                WHERE captains.name ILIKE '%${filter}%'
                OR captains.ocupation ILIKE '%${filter}%'
                GROUP BY captains.id
                ORDER BY total_guests DESC`, function (err,results) {//`SELECT * FROM captains`, pegando todos os campos daquela tabela no banco de dados
            if (err) throw `Database Error ${err}`
            
            callback(results.rows)// enviando os dados como parametro
        })
    },
    update(data,callback){
        const query = `
        UPDATE captains SET 
            avatar_url=($1),
            name=($2),
            ocupation=($3),
            origin=($4),
            services=($5)
        WHERE id = $6     
    `//NUNCA ESQUECA QUE SEU UPDATE PRECISA TER UM WHERE


        const values = [
            data.avatar_url,
            data.name,
            data.ocupation,
            data.origin,
            data.services,
            data.id
        ]

        db.query(query, values, function(err, results){
            if (err) throw `Database error! ${err}`

            callback()// Não precisanddo devolver nada pois no captains ele já enviará os dados do req.body
        })

    },
    delete(id, callback){
        db.query(`DELETE FROM captains WHERE id = $1`, [id], function(err, results){
            if (err) throw `Database error! ${err}`

            //se tudo deu certo...
            return callback()
        })
    },
    paginate(params){
        //tirando as variaveis colocadas no params no  controller captains.js
      const  { filter, limit, offset, callback } = params

      let query = 
      `SELECT captains.*, count (members) AS total_guests
      FROM captains
      LEFT JOIN members ON (captains.id = members.captain_id)
      `

      if (filter) {
          query = `${query}
          WHERE  captains.name ILIKE '%${filter}%'
          OR  captains.ocupation ILIKE '%${filter}%'
          `
      }
      // Paginação
      query = `${query}
      GROUP BY captains.id LIMIT $1 OFFSET $2
      `
                        //mandando as variáveis do params para os $1, $2
      db.query(query, [ limit, offset ], function(err, results){
          if(err) throw "Database error"

          callback(results.rows)
      })
    }
}