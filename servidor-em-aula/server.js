const app = require("./src/app")
const PORT = 3030

app.listen(PORT, ()=>{
    console.log(`A API está rodando na porta: ${PORT}`)
})