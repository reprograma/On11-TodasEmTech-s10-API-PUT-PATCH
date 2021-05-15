const { response } = require("../app")
const tarefasJson = require("../models/tarefas.json")
const utils = require("../utils/ToDoUtils")

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

    response.status(200).send(novaTarefa)

}

const replacePost = (request, response) =>{
    const idRequerido = request.params.id
    let postBody = request.body

    const postFiltrado = utils.filtrarPost(tarefasJson,idRequerido)

    let postAtualizado = {
        id: postFiltrado.id,
        dataInclusao: postFiltrado.dataInclusao,
        concluido: postBody.concluido,
        descricao: postBody.descricao,
        nomeColaborador: postBody.nomeColaborador
    }

    
    const indice = tarefasJson.indexOf(postFiltrado)
    tarefasJson.splice(indice, 1, postAtualizado)

    response.status(200).json([{
        "mensagem": "Post substituido com sucesso",
        postAtualizado
    }])



}

const updateName = (request, response) =>{
    const idRequerido = request.params.id
    let newName = request.body.nomeColaborador
    const postFiltrado = utils.filtrarPost(tarefasJson,idRequerido)

    postFiltrado.nomeColaborador = request.body.nomeColaborador

    response.status(200).json([{
        "mensagem": "Nome do colaborador atualizado com sucesso",
        postFiltrado
    }])
}

const updateAnything = (request, response) =>{
    const idRequerido = request.params.id
    const atualizacaoBody = request.body
    const postFiltrado = utils.filtrarPost(tarefasJson,idRequerido)

    let listaDeChaves = Object.keys(atualizacaoBody)

    listaDeChaves.forEach((chave)=>{
        postFiltrado[chave] = atualizacaoBody[chave]
    })

    response.status(200).json([{
        "mansagem": "Post atualizado com sucesso",
        postFiltrado
    }])
}

const deleteTask = (request, response)=>{
    const idRequirido = request.params.id
    const tarefaFiltrada = tarefasJson.find(tarefa => tarefa.id == idRequirido)

    const indice = tarefasJson.indexOf(tarefaFiltrada)
    tarefasJson.splice(indice, 1)

    response.status(200).json([{
        "mensagem": "Tarefa deletada com sucesso",
        tarefasJson
    }])

}


module.exports ={
    getAll,
    getById,
    createTask,
    replacePost,
    updateName,
    updateAnything,
    deleteTask
}