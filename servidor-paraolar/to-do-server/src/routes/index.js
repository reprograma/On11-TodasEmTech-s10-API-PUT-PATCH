const express = require("express")
const router = express.Router()

router.get("/", (request, response)=>{
    response.status(200).json({
        "titulo": "Tarefas do Api - Reprograma",
        "version": "1.0.0",
        "mensagem": "bem vinda bebe"
    })
})
module.exports = router


