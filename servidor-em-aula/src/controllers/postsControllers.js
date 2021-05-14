const postsJson = require("../models/posts.json")
const utils = require("../utils/postsUtils")
const fs = require("fs")

//MÉTODOS GETS
const getAll = (request, response) => {
    response.status(200).json(postsJson)
}

const getById = (request, response) =>{
    const idRequerido = request.params.id
    const postFiltrado = utils.filtrarPost(postsJson, idRequerido)

    if (postFiltrado == undefined || idRequerido == " "){
        response.status(404).json({
            "mensagem": "Por favor Informe um ID válido"
        })
    }else{
        response.status(200).send(postFiltrado)
    }
    
}


//MÉTODO POST 
const createPost = (request, response) => {
    let tituloRequerido = request.body.titulo
    let conteudoRequerido = request.body.conteudo
    let etiquetasRequeridas = request.body.etiquetas

    if(!tituloRequerido || !conteudoRequerido || !etiquetasRequeridas || tituloRequerido == "" || conteudoRequerido == "" || etiquetasRequeridas == ""){
        response.status(400).json({
            "mensagem": "Preencha todos os campos corretamente"
        })
    }

    const newPost = {
        id: Math.random().toString(32).substr(2, 6),
        dataCriacao: utils.dataAtualFormatada(),
        titulo: tituloRequerido,
        conteudo: conteudoRequerido,
        etiquetas: etiquetasRequeridas
    }
    postsJson.push(newPost)

    fs.writeFile("./src/models/posts.json", JSON.stringify(postsJson), 'utf8', function(err) {
        if(err){
            return response.status(424).send({message:err})
        }
    })

    response.status(201).json({
        "mensagem": "Novo Post Criado",
        newPost
    })
}

//MÉTODO PUT
const replacePost = (request, response) => {
    const idRequerido = request.params.id
    let postBody = request.body
    const postFiltrado = utils.filtrarPost(postsJson, idRequerido)

    // postBody.id = idRequerido
    // postBody.dataCriacao = postFiltrado.dataCriacao

    let postAtualizado = {
        id: postFiltrado.id,
        dataCriacao: postFiltrado.dataCriacao,
        titulo: postBody.titulo,
        conteudo: postBody.conteudo,
        etiquetas: postBody.etiquetas
    }

    const indice = postsJson.indexOf(postFiltrado)
    postsJson.splice(indice, 1, postAtualizado)

    fs.writeFile("./src/models/posts.json", JSON.stringify(postsJson), 'utf8', function(err) {
        if(err){
            return response.status(424).send({message:err})
        }
    })

    response.status(200).json({
        "mensagem": "Post Atualizado com Sucesso",
        postAtualizado
    })
}

//MÉTODP PATCH atualiza apenas o título da postagem
const updateTitle = (request, response) => {
    const idRequerido = request.params.id
    let newTitle = request.body.titulo
     const postFiltrado = utils.filtrarPost(postsJson, idRequerido)

    postFiltrado.titulo = newTitle

    fs.writeFile("./src/models/posts.json", JSON.stringify(postsJson), 'utf8', function(err) {
        if(err){
            return response.status(424).send({message:err})
        }
    })

    response.status(200).json({
        "mensagem": "Título do Post Atualizado com Sucesso",
        postFiltrado
    })

}

// MÉTODO PATCH atualiza qualquer parte do post separadamente
const updateAnything = (request, response) => {
    const idRequerido = request.params.id
    const atualizacaoBody = request.body
    const postFiltrado = utils.filtrarPost(postsJson, idRequerido)

    Object.keys(atualizacaoBody).forEach((chave) => {
    postFiltrado[chave] = atualizacaoBody[chave]
    })

    fs.writeFile("./src/models/posts.json", JSON.stringify(postsJson), 'utf8', function(err){
        if(err){
            return response.ststus(424).send({message:err})
        }        
    })

    response.status(200).json({
        "mensagem": "Post Atualizado com Sucesso",
        postFiltrado
    })

}

const deletePost = (request, response) => {
    const idRequerido = request.params.id
    const postFiltrado = utils.filtrarPost(postsJson, idRequerido)
    
    if(postFiltrada == undefined || idRequerido == " "){
        return response.status(404).json([{
             "mensagem":"Por favor informe um ID válido"
         }])
     } 

    const indice = postsJson.indexOf(postFiltrado)
    postsJson.splice(indice, 1)

    fs.writeFile("./src/models/posts.json", JSON.stringify(postsJson), 'utf8', function(err) {
        if(err){
            return response.status(424).send({message:err})
        }
    })

    response.status(200).json({
        "mensagem": "Post Deletado com Sucesso",
        postsJson
    })
}

module.exports = {
    getAll,
    getById,
    createPost,
    replacePost,
    updateTitle,
    updateAnything,
    deletePost
}