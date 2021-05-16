const postJson = require("../models/posts.json")

const getAll = (request, response) => {
    response.status(200).json(postsJson)
}

const getById = (request, response) => {
    const idRequerido = request.params.id
    const postFiltrado = postsJson.find(post => post.id == idRequerido)

    response.status(200).send(postFiltrado)
}

const createPost = (request, response) => {
    let tituloRequerido = request.body.titulo
    let conteudoRequerido = request.body.conteudo
    let etiquetasRequeridas = request.body.etiquetas

    let newPost = {

        id: Math.random().toString(32).substr(2, 6),
        dataCriacao: new Date(),
        titulo: tituloRequerido,
        conteudo: conteudoRequerido,
        etiquetas: etiquetasRequeridas,
    }
    postJson.push(newPost)
    response.status(201).json([{
        "mensagem": "Post Creado",
        newPost
    }])
} 


const deletePost = (request, response) => {
    const idRequerido = request.params.id
    const postFiltrado = postJson.find(post => post.id == idRequerido)

    const indice = postJson.indexOf(postFiltrado)
    postsJson.splice(indice, 1)

    response.status(200).json([{
        "mensagem": "Post deletado",
        postsJson
    }])
}

module.exports = {
    getAll,
    getById,
    deletePost,
    createPost,
}