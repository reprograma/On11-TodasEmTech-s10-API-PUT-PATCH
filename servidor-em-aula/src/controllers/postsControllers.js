const postsJson = require("../models/posts.json")

const getAll = (request, response)=>{
    response.status(200).json(postsJson)
}

const getById = (request, response)=>{
    const idRequerido = request.params.idRequerido
    let postFiltrado = posts.find(post => post.id == idRequerido)

    if(postFiltrado == undefined || idRequerido == ''){
        response.status(404).json([{
            "mesagem":"Id não existe"
        }])
    }else{
        response.status(200).json(postFiltrado)
    }
}

const createPost = (request, response)=>{
    let tituloRequerido = request.body.titulo
    let conteudoRequerido = request.body.conteudo
    let etiquetaRequerida = request.body.etiquetas

    let newPost = {
        id: Math.random().toString(32).substr(2,6),
        dataCriacao: new Date(),
        titulo: tituloRequerido,
        conteudo: conteudoRequerido,
        etiquetas: etiquetaRequerida
    }

    postsJson.push(newPost)

    response.status(201).json([{
        "mensagem":"Post criado!",
        newPost
    }])
}

const replacePost = (request, response)=>{
    const idRequerido = request.params.id
    let postBody = request.body
    const postFiltrado = postsJson.find(post => post.id == idRequerido)

    let postAtualizado = {
        id: postFiltrado.id,
        dataCriacao: postFiltrado.dataCriacao,
        titulo: postBody.titulo,
        conteudo: postBody.conteudo,
        etiquetas: postBody.etiquetas
    }

    const indice = postsJson.indexOf(postFiltrado)
    postsJson.splice(indice, 1, postAtualizado)

    response.status(200).json([{
        "mensagem":"Post substituido com sucesso",
        postAtualizado
    }])
}

const updateTitle = (request, response) =>{
    const idRequerido = request.params.id
    let newTitle = request.body.titulo
    const postFiltrado = postsJson.find(post => post.id == idRequerido)

    postFiltrado.titulo = newTitle

    response.status(200).json([{
        "mensagem":"Titulo atualizado com sucesso",
        postsJson
    }])
} 

const updateAnything = (request, response) =>{
    const idRequerido  = request.params.id
    const atualizacaoBody = request.body
    const postFiltrado = postsJson.find(post => post.id == idRequerido)

    let listaDeChaves  = Object.keys(atualizacaoBody)

    listaDeChaves.forEach((chave)=>{
        postFiltrado[chave] = atualizacaoBody[chave] 
    })

    response.status(200).json([{
        "mensagem":"Post atualizado com sucesso",
        postFiltrado
    }])
}

const deletePost = (request, response)=>{
    const idRequerido = request.params.id
    const postFiltrado = postsJson.find(post => post.id == idRequerido)

    const indice = postsJson.indexOf(postFiltrado)

    postsJson.splice(indice, 1)

    response.status(200).json([{
        "mensagem":"Post deletado",
        postsJson
    }])
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