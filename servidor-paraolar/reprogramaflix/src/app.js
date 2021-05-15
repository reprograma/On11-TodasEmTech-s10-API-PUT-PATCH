const express = require("express")
const cors = require("cors")

const filmes = require("./routes/filmesRoutes") 

const app = express() 

app.use(cors())
app.use(express.json())

app.use("/filmes", filmes)

module.exports = app