var mysql = require('mysql')

module.exports = mysql.createConnection({
    user: "root",
    password: "Ad_914989",
    host: "127.0.0.1",
    port: 3306,
    database: "receitas_pra_casinha"
})