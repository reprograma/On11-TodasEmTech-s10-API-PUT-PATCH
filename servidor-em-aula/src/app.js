const express = require("express")
const app = express()

const posts = require("./routes/postsRoutes")

app.use("/posts", posts)

module.exports = app