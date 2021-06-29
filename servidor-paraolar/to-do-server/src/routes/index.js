const { Router } = require("express")
const express = require("express")
const router = express.router()

router.get("/", (request, response)=>{
    response.status(200).json([{
        "titulo": "To-do Api - Reprograma",
        "version": "1.0.0",
        "mensagem": "bem vinda bebe"
    }])
})
module.exports = router