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

const validadeInputs = (obj , require) => {    
    let keys =  Object.keys(obj);
    let outObj = {};
    for (let key of keys) {
         let value = obj[key] || undefined;
        if (value==""  || !value) {
            if (require) return false;
        }
        else 
            outObj[key] = value;
    }
    return outObj;
}


const updateTask = (request, response) => {
    const bodyData = validadeInputs(request.body);
    const tarefa = tarefas.find(e => request.params.id==e.id)

    if (tarefa==undefined || !bodyData) return response.status(400).send({ 
        mensagem : "Por favor, verificar se enviou o ID correto e ao menos uma propriedade no json"
    }) 
    
    // removendo parte da automacao
    delete bodyData.id;
    for (let key of Object.keys(bodyData)) {
        if (!Object.keys(tarefa).includes(key)) return response.status(400).send({ 
            mensagem : "Por favor, verificar a chave do json!"
        })
    }

    // add new json
    let newJson = {}
    for (var key of Object.keys(tarefa)) {
        newJson[key] = bodyData[key] || tarefa[key]
    }


    // replace
    tarefas.splice(tarefas.indexOf(tarefa) , 1, newJson)
    
    
    response.status(200).send({
        'mensagem' : 'Sucesso !'
    })
    

}
module.exports ={
    getAll,
    getById,
    createTask,
    deleteTask,
    updateTask
}