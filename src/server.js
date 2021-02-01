const express = require("express")
const nunjucks = require("nunjucks")
const routes = require("./routes")
const methodOverride = require('method-override')

const server = express()

server.use(express.urlencoded({ extended: true }))

// Desenvolvimento
/* server.use(express.static('public')) */

// Produção
server.use(express.static(join(__dirname, 'public')));

server.use(methodOverride('_method'))
server.use(routes)

server.set("view engine", "njk")

nunjucks.configure("src/app/views", {
    express:server,
    autoescape: false,
    noCache: true
})

const port = process.env.port || 3000;
server.listen(port, function(req, res) {
    console.log("server is running")
})