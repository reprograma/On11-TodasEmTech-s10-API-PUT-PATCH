const express = require("express")//chama o express 
const controller  = require("../controllers/filmesController")//chama o controller
const router = express.Router()//executando Router

//configurando a continuação das rotas e informando qual função irá usar do controller
router.get("/all", controller.getAll)
router.get("/title", controller.getByTitle)
router.get("/genre", controller.getByGenre)
router.get("/:id", controller.getById)

router.post("/create", controller.createFilm)

router.put("/:id", controller.replaceFilm)

router.patch("/update/:id", controller.updateAnything)

router.delete("/delete/:id", controller.deleteFilm)

module.exports = router