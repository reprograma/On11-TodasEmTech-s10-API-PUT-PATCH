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

const upDate = (request, response)=>{
    const tarefa = tarefasJson.find(tarefa=> tarefa.id == request.params.id)
    const tarefaReq = request.body
    delete tarefaReq.id
 
    console.log(Object.keys(tarefaReq))

    Object.keys(tarefa).forEach(key=>tarefa[key]=tarefaReq[key]||tarefa[key])
    console.log(tarefa) 

        response.status(200).json([{
            "mensagem":"Tarefa atualizada com sucesso",
            tarefasJson
        }])
}
const put = (request, response)=>{
    const tarefa = tarefasJson.find(tarefa=> tarefa.id == request.params.id)
    const tarefaReq = request.body
    
    
    let dataInclusao = tarefaReq.dataInclusao || tarefa.dataInclusao
    let concluido = (tarefaReq.concluido==undefined)? tarefa.concluido : tarefaReq.concluido
    let descricao = tarefaReq.descricao || tarefa.descricao
    let nomeColaborador = tarefaReq.nomeColaborador || tarefa.nomeColaborador
    let id = tarefa.id

    const putJson = {id,dataInclusao,concluido,descricao,nomeColaborador}
    console.log(putJson)

    const indice = tarefasJson.indexOf(tarefa)
    tarefasJson.splice(indice,1,putJson)

    response.status(200).json([{
        "mensagem":"Tarefa substituida com sucesso",
        tarefasJson
    }])
}

module.exports ={
    getAll,
    getById,
    createTask,
    deleteTask,
    upDate,
    put
}