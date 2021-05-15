const tarefasJson = require("../models/tarefas.json")
const fs = require("fs")

//GET
const getAll = (request, response) => {
    response.status(200).send(tarefasJson)
}

const getById = (request, response) => {
    const idRequerido = request.params.id
    const tarefaFiltrada = tarefasJson.find(tarefa => tarefa.id == idRequerido)

    response.status(200).send(tarefaFiltrada)
    if (tarefaFiltrada == undefined || idRequerido == " ") {
        response.status(404).json({
            "mensagem": "Por favor Informe um ID válido"
        })
    } else {

    }
}

// FUNÇÃO fs.writeFile 
function fsWriteFile() {
    fs.writeFile("./src/models/tarefas.json", JSON.stringify(tarefasJson), 'utf8', function (err) {
        if (err) {
            return response.status(424).send({ message: err })
        }
    })
}

//POST
const createTask = (request, response) => {
    const descricaoRequerida = request.body.descricao
    const nomeColaboradoRequerido = request.body.nomeColaborador

    if (!descricaoRequerida || !nomeColaboradoRequerido || descricaoRequerida == "" || nomeColaboradoRequerido == "") {
        response.status(400).json({
            "mensagem": "Preencha todos os campos corretamente"
        })
    }

    const novaTarefa = {
        id: Math.random().toString(32).substr(2, 9),
        dataInclusao: dataAtualFormatada(), // função data formatada ante astava apenas new Date()
        concluido: false,
        descricao: descricaoRequerida,
        nomeColaborador: nomeColaboradoRequerido
    }
    tarefasJson.push(novaTarefa)

    fsWriteFile()

    response.status(200).send(novaTarefa)
}


//PUT
const replaceTask = (request, response) => {
    const idRequerido = request.params.id
    let taskBody = request.body
    const tarefaFiltrada = tarefasJson.find(tarefa => tarefa.id == idRequerido)

    const taskAtualizada = {
        id: tarefaFiltrada.id,
        dataInclusao: tarefaFiltrada.dataInclusao,
        concluido: taskBody.concluido,
        descricao: taskBody.descricao,
        nomeColaborador: taskBody.nomeColaborador
    }

    const indice = tarefasJson.indexOf(tarefaFiltrada)
    tarefasJson.splice(indice, 1, taskAtualizada)

    fsWriteFile()

    response.status(200).json({
        "mensagem": "Tarefa Atualizada com Sucesso",
        taskAtualizada
    })

}


//PATCH
const updateName = (request, response) => {
    const idRequerido = request.params.id
    let newName = request.body.nomeColaborador
    const tarefaFiltrada = tarefasJson.find(tarefa => tarefa.id == idRequerido)

    tarefaFiltrada.nomeColaborador = newName

    fsWriteFile()

    response.status(200).json({
        "mensagem": "Nome atualizado com sucesso",
        tarefaFiltrada
    })

}

const updateAnything = (request, response) => {
    const idRequerido = request.params.id
    const atualizacaoBody = request.body
    const tarefaFiltrada = tarefasJson.find(tarefa => tarefa.id == idRequerido)

    Object.keys(atualizacaoBody).forEach((chave) => {
        tarefaFiltrada[chave] = atualizacaoBody[chave]
    })

    fsWriteFile()

    response.status(200).json({
        "mensagem": "Post Atualizado com Sucesso",
        tarefaFiltrada
    })

}

//DELETE
const deleteTask = (request, response) => {
    const idRequerido = request.params.id
    const tarefaFiltrada = tarefasJson.find(tarefa => tarefa.id == idRequerido)

    if (tarefaFiltrada == undefined || idRequerido == " ") {
        return response.status(404).json([{
            "mensagem": "Por favor informe um ID válido"
        }])
    }

    const indice = tarefasJson.indexOf(tarefaFiltrada)
    tarefasJson.splice(indice, 1)


    fsWriteFile()


    response.status(200).json({
        "mensagem": "Tarefa Deletada com Sucesso",
        tarefasJson
    })
}

module.exports = {
    getAll,
    getById,
    createTask,
    replaceTask,
    updateName,
    updateAnything,
    deleteTask
} 