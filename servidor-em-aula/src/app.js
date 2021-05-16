const express = require("express")
const cors = require("cors")
const posts = require("./routes/postsRoutes")

const app = express()

app.use(cors())
app.use(express.json())

app.use("/posts", posts)

module.exports = app
