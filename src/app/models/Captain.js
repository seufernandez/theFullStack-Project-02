const { age, date } = require("../../lib/utilities");

const db = require("../../config/db")



module.exports = {
    //seleciona todos os instrutores
    all(callback) {

        db.query(`SELECT * FROM captains`, function (err,results) {//`SELECT * FROM captains`, pegando todos os campos daquela tabela no banco de dados
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
    }
}