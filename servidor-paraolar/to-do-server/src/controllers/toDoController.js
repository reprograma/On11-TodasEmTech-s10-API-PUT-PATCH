const tarefasJson = require("../models/tarefas.json")
const fs = require("fs")


const getAll = (request, response)=>{
    response.status(200).send(tarefasJson)
}

const getById = (request, response) =>{
    const idRequirido = request.params.id
    const tarefaFiltrada = tarefasJson.find(tarefa => tarefa.id == idRequirido)
    console.log(tarefaFiltrada)
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

//substituir informação com PUT
const replaceTask = (request, response) =>{
    const idRequirido = request.params.id
    const tarefaFiltrada = tarefasJson.find(tarefa => tarefa.id == idRequirido)

    
    const tarefaAtualizada = {
    id: tarefaFiltrada.id,
    dataInclusao: tarefaFiltrada.dataInclusao,
    concluido: false,
    descricao: request.body.descricao,
    nomeColaborador: request.body.nomeColaborador
    }

    const indice = tarefasJson.indexOf(tarefaFiltrada)
    tarefasJson.splice(indice, 1, tarefaAtualizada)

    response.status(200).json([{
        "mensagem":"tarefa atualizada",
        tarefaAtualizada
    }])
}

//atualizar informação com PATCH (qualquer informação)
const updateTask = (request, response)=>{
    const idRequirido = request.params.id
    const tarefaFiltrada = tarefasJson.find(tarefa => tarefa.id == idRequirido)

    let listaChaves = Object.keys(request.body)
    console.log(listaChaves)

    listaChaves.forEach((chave)=>{
        tarefaFiltrada[chave] = request.body[chave]
    })

    response.status(200).json([{
        "mensagem":"post atualizado",
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
    deleteTask, 
    replaceTask,
    updateTask
}