const express = require("express") //chama o express
const app = express() //executar express
const cors = require("cors")

app.use(cors())
app.use(express.json()) //parsear

const filmes = require("./routes/filmesRoutes") //chamando todas as rotas

app.use("/filmes", filmes) //colocando a rota raiz

module.exports = app //exportando app