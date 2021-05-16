const express = require("express") //chama o express
const cors = require("cors");
const filmes = require("./routes/filmesRoutes") //chamando todas as rotas

const app = express() //executar express

app.use(cors());
app.use(express.json());

app.use("/filmes", filmes) //colocando a rota raiz

module.exports = app //exportando app