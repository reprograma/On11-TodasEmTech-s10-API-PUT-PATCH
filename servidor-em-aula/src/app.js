const express = require("express") // Chama o express
const cors = require("cors") // Chama o cors
const posts = require("./routes/postsRoutes") // Chama as rotas

const app = express() // Executa o express

app.use(cors())
app.use(express.json()) // Faz o parse do body
app.use("/posts", posts) // Configurando a rota principal

module.exports = app