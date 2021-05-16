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

const replaceTask = (request, response) => {
    const idRequerido = request.params.id
    let tarefaBody = request.body
    const tarefaFiltrada = tarefasJson.find(tarefa => tarefa.id == idRequerido)

    let tarefaAtualizada = {
        id: tarefaFiltrada.id,
        dataInclusao: tarefaFiltrada.dataInclusao,
        concluido: tarefaBody.concluido,
        descricao: tarefaBody.descricao,
        nomeColaborador: tarefaBody.nomeColaborador
    }

    const indice = tarefasJson.indexOf(tarefaFiltrado)
    tarefaJson.splice(indice, 1, tarefaAtualizada)

    response.status(200).json([{
        "mensagem": "Tarefa substituida com sucesso",
        tarefaAtualizada
    }])

}

const updateTask = (request, response) => {
    const idRequerido = request.params.id
    let newDescricao = request.body.descricao
    const descricaoFiltrado = tarefaJson.find(tarefa => tarefa.id == idRequerido)

    descricaoFiltrado.descricao = newDescricao

    response.status(200).json([{
        "mensagem": "Descricao atualizada com sucesso",
        descricaoFiltrado
    }])
}

const updateAnything = (request, response) => {
    const idRequerido = request.params.id
    const atualizacaoBody = request.body
    const tarefaFiltrado = tarefasJson.find(tarefa => tarefa.id == idRequerido)

    let listaDeChaves = Object.keys(atualizacaoBody)

    listaDeChaves.forEach((chave) => {
        tarefasFiltrado[chave] = atualizacaoBody[chave]
    })

    response.status(200).json([{
        "mensagem": "Tarefa atualizada com sucesso",
        tarefaFiltrado
    }])
}


module.exports = {
    getAll,
    getById,
    createTask,
    replaceTask,
    updateTask,
    updateAnything,
    deleteTask
}