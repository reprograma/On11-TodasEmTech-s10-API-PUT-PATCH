const express = require("express"); //chama o express
const cors = require("cors");

const app = express(); //executar express

const filmes = require("./routes/filmesRoutes"); //chamando todas as rotas

app.use("/filmes", filmes); //colocando a rota raiz
app.use(cors());
app.use(express.json());

module.exports = app; //exportando app
