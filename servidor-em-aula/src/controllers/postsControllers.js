const postsJson = require("../models/posts.json")

const getAll = (request, response) => {
    response.status(200).json(postsJson)
}

const getById = (request, response) => {
    const idRequerido = request.params.idRequerido
    const postFiltrado = postsJson.find(post => post.id == idRequerido)

    response.status(200).send(postFiltrado)
}


const createPost = (request, response) => {
    let tituloRequerido = request.body.titulo
    let conteudoRequerido = request.body.conteudo
    let etiquedasRequeridas = request.body.etiquetas

    let newPost = {
        id: Math.random().toString(32).substr(2, 6),
        dataCriação: new Date(),
        titulo: tituloRequerido,
        conteudo: conteudoRequerido,
        etiquetas: etiquedasRequeridas,
    }

    postsJson.push(newPost)
    response.status(201).json([{
        "mensagem": "Post criado",
        newPost
    }])
}

const replacePost = (request, response) => {
    const idRequerido = request.params.id
    let postAtualizado = request.body
    const postFiltrado = postsJson.find(post => post.id == idRequerido)
    const indice = postsJson.indexOf(postFiltrado)

    postAtualizado.id = idRequerido
    postAtualizado.dataCriação = postAtualizado.dataCriação

    postsJson.splice(indice, 1, postAtualizado)

    response.status(200).json([{
        "mensagem": "post substituido com suscesso",
        postAtualizado
    }])
}

const updateTitle = (request, response) => {
    const idRequerido = request.params.id
    let newTitle = request.body.titulo
    const postFiltrado = postsJson.find(post => post.id == idRequerido)

    postFiltrado.tituloRequerido = newTitle

    response.status(200).json([{
        "mensagem": "titulo atualizado com sucesso",
        postFiltrado
    }])
}

const updateAnything = (request, response) => {
    const idRequerido = request.params.id
    let atualizacaoBody = request.body
    const postFiltrado = postsJson.find(post => post.id == idRequerido)

    Object.keys(atualizacaoBody).forEach((chave) => {
        postFiltrado[chave] = atualizacaoBody[chave]
    })


    response.status(200).json([{
        "mensagem": "Post atualizado com sucesso",
        postFiltrado
    }])
}

const deletePost = (request, response) => {
    const idRequerido = request.params.id
    const postFiltrado = postsJson.find(post => post.id == idRequerido)

    const indice = postsJson.indexOf(postFiltrado)
    postsJson.splice(indice, 1)

    response.status(200).json([{
        "mensagem": "post deletado",
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
