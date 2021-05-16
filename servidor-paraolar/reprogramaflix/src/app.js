const express = require("express") //chama o express
const cors = require("cors")
const filmes = require("./routes/filmesRoutes")

const app = express() //executar express

const filmes = require("./routes/filmesRoutes") //chamando todas as rotas

app.use("/filmes", filmes) //colocando a rota raiz
app.use(cors())
app.use(express.json())

app.use("/filmes",filmes)


module.exports = app //exportando app