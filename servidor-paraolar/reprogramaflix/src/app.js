const express = require("express") //chama o express
const app = express() //executar express

const filmes = require("./routes/filmesRoutes") //chamando todas as rotas

app.use("/filmes", filmes) 

module.exports = app 