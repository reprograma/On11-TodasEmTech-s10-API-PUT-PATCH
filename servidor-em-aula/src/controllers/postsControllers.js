const postJson = require("../models/posts.json")

const getAll = (request, response) => {
    response.status(200).json(postJson)
}
const getById = (request, response) => {
    const idRequirido = request.params.getById
    const postFiltrado = postsJson.find(post => post.id == idRequirido)
    response.status(200).send(postFiltrado)
}

const createPost = (request, response) => {
    let tituloRequerido = request.body.titulo
    let conteudoRequerido = request.body.conteudo
    let etiquetasRequeridas = request.body.etiquetas

    let newPost = {
        id: Math.random().toString(32).substr(2, 6),
        dataCriação: new Date(),
        titulo: tituloRequerido,
        conteudo: conteudoRequerido,
        etiquetas: etiquetasRequeridas
    }
    postsJson.push(newPost)

    response.status(201).json([{
        "mensagem": "Post criado",
        newPost
    }])

}

const replacePost = (request, response) => {
    const idRequerido = request.params.id
    let postBody = request.body
    const postFiltrado = postJson.find(post => post.id == idRequerido)
    //postBody.id = idRequerido
    //  postAtualizado.dataCriacao = postFiltrado.dataCriacao
    let postAtualizado = {
        id: postFiltrado.id,
        dataCriacao: postFiltrado.dataCriacao,
        titulo: postBody.titulo,
        conteudo: postBody.conteudo,
        etiquetas: postBody.etiquetas
    }
    const indice = postJson.indexOf(postFiltrado)
    postsJson.splice(indice, 1, postAtualizado)

    response.status(200).json([{
        "mensagem": "Post substituido com sucesso",
        postAtualizado
    }])
}

const updateAnything = (request, response) => {
    const idRequerido = requets.params.id
    const atualizacaoBody = request.body
    const postFiltrado = postsJson.find(post => post.id == idRequerido)

    let listaDeChaves = object.keys(atualizacaoBody)

    listaDeChaves.forEach((chave) => {
        postFiltrado[chave] = atualizacaoBody[chave]
    })
    response.status(200).json([{
        "mensagem": "Post atualizado com sucesso",
        postFiltrado
    }])
}


const updateTitle = (request, response) => {
    const idRequerido = request.params.id
    let newTitle = request.body.titulo
    const postFiltrado = postJson.find(post => post.id == idRequerido)

    postFiltrado.titulo = newTitle

    response.status(200).json([{
        "mensagem": "titulo atualizado com sucesso",
        postFiltrado
    }])

}


const deletePost = (request, response) => {
    const idRequirido = request.params.id
    const postFiltrado = postsJson.find(post => post.id == idRequirido)

    const indice = postsJson.indexOf(postFiltrado)
    postsJson.splice(indice, 1)

    response.status(200).json([{
        "mensagem": "Post deletado",
        postJson
    }])
}

module.exports = {
    getAll,
    getById,
    deletePost,
    createPost,
    updateTitle,
    updateAnything,
    replacePost
}


