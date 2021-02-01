const express = require("express")
const path = require('path')
const hike = require('./routes/hike')
const nunjucks = require("nunjucks")
const routes = require("./routes")
const methodOverride = require('method-override')


const server = express()
server.get('/hikes', hike.index);
server.post('/add_hike', hike.add_hike);

server.use(express.urlencoded({ extended: true }))

// Desenvolvimento
/* server.use(express.static('public')) */

// Produção
server.use(express.static(path.join(__dirname, 'public')));

server.use(methodOverride('_method'))
server.use(routes)

server.set("view engine", "njk")

nunjucks.configure("src/app/views", {
    express:server,
    autoescape: false,
    noCache: true
})

const port = process.env.port || 5000;
server.listen(port, function(req, res) {
    console.log("server is running")
})