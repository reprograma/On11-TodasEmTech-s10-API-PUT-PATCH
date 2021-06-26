const tarefasJson = require("../models/tarefas.json")
const fs = require("fs")

const getAll = (request, response) => {
  response.status(200).send(tarefasJson)
}

const getById = (request, response) => {
  const idRequirido = request.params.id
  const tarefaFiltrada = tarefasJson.find(tarefa => tarefa.id == idRequirido)

  response.status(200).send(tarefaFiltrada)
}

const createTask = (request, response) => {
  const descricaoRequirida = request.body.descricao
  const nomeColaboradorRequirido = request.body.nomeColaborador



  const novaTarefa = {
    id: Math.random().toString(32).substr(2, 9),
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

const replaceTask = (request, response) => {
  const idRequerido = request.params.id;
  const tarefaFiltrada = tarefasJson.find(tarefa => tarefa.id == idRequerido);
  let taskBody = request.body;

  let tarefaAtualizada = {
    id: idRequerido,
    dataInclusao: taskBody.dataInclusao,
    concluido: taskBody.concluido,
    descricao: taskBody.descricao,
    nomeColaborador: taskBody.nomeColaborador
  }

  const indice = tarefasJson.indexOf(tarefaFiltrada);
  tarefasJson.splice(indice, 1, tarefaAtualizada);

  response.status(200).json([{
    "mensagem": "Tarefa substituída com sucesso",
    tarefaAtualizada
  }]);
}

const updateAnything = (request, response) => {
  const idRequerido = request.params.id;
  const tarefaFiltrada = tarefasJson.find(tarefa => tarefa.id == idRequerido);
  const atualizacaoBody = request.body;
  
  let listKeys = Object.keys(atualizacaoBody);
  listKeys.forEach((chave) => {
    tarefaFiltrada[chave] = atualizacaoBody[chave];
  });

  response.status(200).json([{
    "mensagem": "Tarefa atualizada com sucesso",
    tarefaFiltrada
  }]);
}

const deleteTask = (request, response) => {
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


module.exports = {
  getAll,
  getById,
  createTask,
  replaceTask,
  updateAnything,
  deleteTask
}