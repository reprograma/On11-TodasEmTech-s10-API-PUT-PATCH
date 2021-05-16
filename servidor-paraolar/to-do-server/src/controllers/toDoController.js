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

const createTask = (request, response) => {
    const descricaoRequirida = request.body.descricao
    const nomeColaboradorRequirido = request.body.nomeColaborador
    let novaTarefa = {
        id: Math.random().toString(32).substr(2,9),
        dataInclusao: new Date(),
        concluido: false,
        descricao: descricaoRequirida,
        nomeColaborador: nomeColaboradorRequirido
    }

    tarefasJson.push(novaTarefa)

    fs.writeFile("./src/models/tarefas.json", JSON.stringify(tarefasJson), 'utf8', function(err){
        if(err) {
            return response.status(424).send({message: err})
        }
    })

    response.status(200).json([{
      "message": "Task Criado",
      novaTarefa
    }])

}

const replaceTask = (req, res) => {
  const id = req.params.id
  let {descricao, nomeColaborador} = req.body
  const task = tarefasJson.find(i => i.id == id)
  const index = tarefasJson.indexOf(task)

  let updateTask = {
    id: id,
    dataInclusao: task.dataInclusao,
    concluido: task.concluido,
    descricao,
    nomeColaborador
  }

  tarefasJson.splice(index, 1, updateTask)

  fs.writeFile("./src/models/tarefas.json", JSON.stringify(tarefasJson), 'utf8', (err) => {
    err && res.status(401).send({message: err})
  })

  res.status(200).json([{
    "message": "task atualizada!",
    updateTask
  }])
}

const updateAnything = (req, res) => {
  const id = req.params.id
  let bodyRequest = req.body
  const task = tarefasJson.find(i => i.id == id)

  
  Object.keys(bodyRequest).forEach(key => {
    task[key] = bodyRequest[key]
  })

  fs.writeFile("./src/models/tarefas.json", JSON.stringify(tarefasJson), 'utf8', (err) => {
    err && res.status(401).send({message: err})
  })

  res.status(200).json([{
    "message": "dados atualizados",
    task
  }])
}


const deleteTask = (request, response)=>{
    const idRequirido = request.params.id
    const tarefaFiltrada = tarefasJson.find(tarefa => tarefa.id == idRequirido)

    const indice = tarefasJson.indexOf(tarefaFiltrada)
    tarefasJson.splice(indice, 1)

    fs.writeFile("./src/models/tarefas.json", JSON.stringify(tarefasJson), 'utf8', function(err){
        if(err) {
            return response.status(424).send({message: err})
        }
    })

    response.status(200).json([{
        "mensagem": "Tarefa deletada com sucesso",
        tarefasJson
    }])

}


module.exports ={
    getAll,
    getById,
    createTask,
    replaceTask,
    updateAnything,
    deleteTask
}