const tarefasJson = require("../models/tarefas.json")
const fs = require("fs")
const { request } = require("express")

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

const replaceTask = (request, response) => {
    const id = request.params.id;
    let tarefaAtualizada = request.body;
    const tarefaFiltrada = tarefasJson.find(tarefa => tarefa.id == id);

    const indice = tarefasJson.indexOf(tarefaFiltrada);

    tarefaAtualizada.id = id;
    tarefasJson.splice(indice, 1, tarefaAtualizada);

    response.status(200).json ([{
        "mensagem": "Tarefa atualizada com sucesso"
    }])
}

const updateAnything = (request, response) => {
    const id = request.params.id;
    const taskAtualizada = request.body;

    const tarefaFiltrada = tarefasJson.find(tarefa => tarefa.id == id);

    Object.keys(taskAtualizada).forEach((key) => {
        tarefaFiltrada[key] = taskAtualizada[key]
    })

    response.status(200).json([{
        "mensagem": "Filme atualizado com sucesso",
        tarefaFiltrada
    }])
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


module.exports ={
    getAll,
    getById,
    createTask,
    replaceTask,
    updateAnything,
    deleteTask
}