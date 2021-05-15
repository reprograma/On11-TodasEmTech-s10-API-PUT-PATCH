const express = require("express")
const cors = require("cors")

const index = require("./routes/index")
const tarefas = require("./routes/toDoRoutes")

const app = express()

app.use(cors())
app.use(express.json()) 



app.use("/", index)
app.use("/tarefas", tarefas)

module.exports = app