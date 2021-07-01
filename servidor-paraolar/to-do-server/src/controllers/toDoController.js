const tarefasJson = require("../models/tarefas.json")
const fs = require("fs")

const getAll = (request, response)=>{
    response.status(200).send(tarefasJson)
}

const getById = (request, response) =>{
    const idRequirido = request.params.id
    const tarefaFiltrada = tarefasJson.find(tarefa => tarefa.id == idRequirido)

    response.status(200).send(tarefaFiltrada)
}

const createTask = (request, response) =>{
    const descricaoRequirida = request.body.descricao
    const nomeColaboradorRequirido = request.body.nomeColaborador

    

    const novaTarefa ={
        id: Math.random().toString(32).substr(2,9),
        dataInclusao: new Date(),
        concluido: false,
        descricao: descricaoRequirida,
        nomeColaborador: nomeColaboradorRequirido
    }

    tarefasJson.push(novaTarefa)

    // fs.writeFile("./src/models/tarefas.json", JSON.stringify(tarefasJson), 'utf8', function(err){
    //     if(err) {
    //         return response.status(424).send({message: err})
    //     }
    // })

    response.status(200).send(novaTarefa)

}

const deleteTask = (request, response)=>{
    const idRequirido = request.params.id
    const tarefaFiltrada = tarefasJson.find(tarefa => tarefa.id == idRequirido)

    const indice = tarefasJson.indexOf(tarefaFiltrada)
    tarefasJson.splice(indice, 1)

    // fs.writeFile("./src/models/tarefas.json", JSON.stringify(tarefasJson), 'utf8', function(err){
    //     if(err) {
    //         return response.status(424).send({message: err})
    //     }
    // })

    response.status(200).json([{
        "mensagem": "Tarefa deletada com sucesso",
        tarefasJson
    }])

}

const updateTask = (req, resp) => {
    const idRequired = req.params.id;
    let { concluido, descricao } = req.body;

    const taskFilter = tarefasJson.find(task => task.id == idRequired);

    if(taskFilter == undefined || idRequired == "") {
        resp.status(404).json([{
            "message": "Tarefa não encontrata"
        }])
    }
    const index = tarefasJson.indexOf(taskFilter)

    let taskUpdated = {
        id: idRequired,
        dataInclusao: taskFilter.dataInclusao,
        concluido,
        descricao,
        nomeColaborador: taskFilter.nomeColaborador

    }

    tarefasJson.splice(index, 1, taskUpdated);

    fs.writeFile("./src/models/tarefas.json", JSON.stringify(tarefasJson), 'utf8', (err) => {
        err && res.status(401).send({message: err})
      })


    resp.status(200).json([{
        "message": "Tarefa atualizada!",
        taskUpdated
    }])

}

const updateAnything = (req, resp) => {
    const idRequired = req.params.id;
    let updatebody = req.body;

    const taskFilter = tarefasJson.find(task => task.id == idRequired);

    if(taskFilter == undefined || idRequired == "") {
        resp.status(404).json([{
            "message": "Tarefa não encontrata"
        }])
    }
    Object.keys(updatebody).forEach(key => {
        taskFilter[key] = updatebody[key];
    })

    fs.writeFile("./src/models/tarefas.json", JSON.stringify(tarefasJson), 'utf8', (err) => {
        err && res.status(401).send({message: err})
      })

      resp.status(200).json([{
          "message": "Tarefa alterada",
          taskFilter
      }])

}

  

module.exports = {
    getAll,
    getById,
    createTask,
    deleteTask,
    updateTask,
    updateAnything
}