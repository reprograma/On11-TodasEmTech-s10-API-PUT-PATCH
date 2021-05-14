const express = require("express")
const app = express()
const cors = require("cors")

app.use(cors())
app.use(express.json())

const index = require ("./routes/index")
const posts = require("./routes/postsRoutes")

app.use("/", index)
app.use("/posts", posts)

module.exports = app
