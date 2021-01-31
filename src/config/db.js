var mysql = require('mysql')

module.exports = mysql.createConnection({
    /* user: "root",
    password: "Ad_914989",
    host: "127.0.0.1",
    port: 3306,
    database: "receitas_pra_casinha" */

    user: process.env.RDS_USERNAME,
    password: process.env.RDS_PASSWORD,
    host: process.env.RDS_HOSTNAME,
    port: process.env.RDS_PORT
})