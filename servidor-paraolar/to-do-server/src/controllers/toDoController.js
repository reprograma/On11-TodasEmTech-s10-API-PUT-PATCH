const tarefasJson = require("../models/tarefas.json")
const fs = require("fs")
const { request } = require("http")
const { response } = require("express")


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

    fs.writeFile("./src/models/tarefas.json", JSON.stringify(tarefasJson), 'utf8', function(err){
        if(err) {
            return response.status(424).send({message: err})
        }
    })

    response.status(200).send(novaTarefa)

}

const replaceToDo = (request, response)=>{
    const idRequirido = request.params.id
    let toDoBody = request.body
    const tarefaFiltrada = tarefasJson.find(tarefa => tarefa.id == idRequirido)

    let tarefaAtualizada = {
        id: tarefaFiltrada.id,
        dataInclusao: tarefaFiltrada.dataInclusao,
        concluido: toDoBody.concluido,
        descricao: toDoBody.descricao,
        nomeColaborador: toDoBody.nomeColaborador
    }

    const indice = tarefasJson.indexOf(tarefaFiltrada)
    tarefasJson.splice(indice, 1, tarefaAtualizada)

    response.status(200).json([{
        "Mensagem": "Tarefa substituida com sucesso!",
        tarefaAtualizada
    }])
}

const updateDescricao = (request, response) =>{
    const idRequirido = request.params.id
    let newDescricao = request.body.descricao
    const tarefaFiltrada = tarefasJson.find(filme => filme.id == idRequirido)

    tarefaFiltrada.descricao = newDescricao

    response.status(200).json([{
        "Mensagem":"Descrição atualizada com sucesso!",
        tarefasJson
    }])
}

const updateAnything = (request, response) =>{
    const idRequirido = request.params.id
    const atualizacaoBody = request.body
    const tarefaFiltrada = tarefasJson.find(tarefa => tarefa.id == idRequirido)

    let listaDeChave = Object.keys(atualizacaoBody)

    listaDeChave.forEach((chave)=>{
        tarefaFiltrada[chave] = atualizacaoBody[chave]
    })

    response.status(200).json([{
        "Mensagem":"Tarefa atualizada com sucesso!",
        tarefaFiltrada
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
    replaceToDo,
    updateDescricao,
    updateAnything,
    deleteTask
}