const postsJson = require("../models/posts.json") // Chama o json

// Retorna todos os posts
const getAll = (request, response)=>{
    response.status(200).json(postsJson)
}

// Retorna um post por id
const getById = (request, response)=>{
    const idRequerido = request.params.id
    const postFiltrado = postsJson.find(post => post.id == idRequerido)
    response.status(200).send(postFiltrado)
}

// Cria uma publicação
const createPost = (request, response)=>{
    let tituloRequerido = request.body.titulo
    let conteudoRequerido = request.body.conteudo
    let etiquetasRequeridas = request.body.etiquetas

    // Cria um novo post
    let newPost = {
        id: Math.random().toString(32).substr(2,6),
        dataCriacao:new Date(),
        titulo: tituloRequerido,
        conteudo: conteudoRequerido,
        etiquetas: etiquetasRequeridas
    }

    // Adiciona o novo post no json
    postsJson.push(newPost)

    // Envia o response
    response.status(201).json([{
        "mensagem":"Post criado",
        newPost
    }])
}

// Substitui uma postagem existente por inteiro
const replacePost = (request, response)=>{
    const idRequerido = request.params.id
    const postBody = request.body // Post atualizado que é enviado pelo body
    const postFiltrado = postsJson.find(post => post.id == idRequerido)

    let postAtualizado = {
        id: postFiltrado.id, // id que vem do post
        dataCriacao: postFiltrado.dataCriacao, // data que vem do post
        titulo: postBody.titulo, // titulo atualizado
        conteudo: postBody.conteudo, // conteudo atualizado
        etiquetas: postBody.etiquetas // etiqueta atualizado
    }
    
    const indice = postsJson.indexOf(postFiltrado) // 1º encontra o indice
    postsJson.splice(indice, 1, postAtualizado)

    // Envia um response
    response.status(200).json([{
        "mensagem": "Post atualizado com sucesso",
        postAtualizado
    }])
}

// Atualiza apenas o título
const updateTitle = (request, response) =>{
    const idRequerido = request.params.id
    const newTitle = request.body.titulo // Cria a const do que será criado
    const postFiltrado = postsJson.find(post => post.id == idRequerido)

    postFiltrado.titulo = newTitle

    response.status(200).json([{
        "mensagem": "Título atualizado com sucesso",
        postFiltrado
    }])
}

// Atualiza qualquer coisa
const updateAnything = (request, response)=>{
    const idRequerido = request.params.id
    const atualizacaoBody = request.body // Atualização vindo do body
    const postFiltrado = postsJson.find(post => post.id == idRequerido)

    let listaDeChaves = Object.keys(atualizacaoBody) // Pega as chaves que o body enviar

    listaDeChaves.forEach((chave)=>{
        postFiltrado[chave] = atualizacaoBody[chave]
    })

    response.status(200).json([{
        "mensagem": "Post atualizado com sucesso",
        postFiltrado
    }])
}

// Deleta um post por id
const deletePost = (request, response) =>{
    const idRequerido = request.params.id
    const postFiltrado = postsJson.find(post => post.id == idRequerido)
    const indice = postsJson.indexOf(postFiltrado)
    
    postsJson.splice(indice, 1)

    response.status(200).json([{
        "mensagem": "Post deletado",
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