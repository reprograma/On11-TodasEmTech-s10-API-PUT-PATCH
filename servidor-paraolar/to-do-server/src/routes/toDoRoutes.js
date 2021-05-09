const express = require("express");
const router = express.Router();
const controller = require("../controllers/toDoController");

router.post("/cadastrar", controller.createTask);

router.get("/", controller.getAll);
router.get("/:id", controller.getById);

router.put("/:id", controller.replaceTask);

router.delete("/:id", controller.deleteTask);

module.exports = router;