const { response } = require("express")
const postsJson = require("../models/posts.json")
const getAll =(request, response) =>{
    response.status(200).json(postsJson)
}


const getById = (request, response) =>{
    const idRequerido = request.params.id
    const postfiltrado = postsJson.find(post => post.id ==idRequerido)
    
    response.status(200).send(postFiltrado)



    }

    const createPost = (request, response)=>{
        let tituloRequerido = request.body.titulo
        let conteudoRequerido = request.body.conteudo
        let etiquetaRequeridas =request.body.etiquetas

    }  

    let newPost={
        id:Math.random().toString(32).substr(2,6),
        dataCriacao: new Date(),
        titulo: tituloRequerido,
        conteudo: conteudoRequerido,
        etiquetas: etiquetasRequeridas
        }

        postsJson.push(newPost)

        response.status(201).json([{
            "mensagem": "Post criado",
            newPost
        }])

    const replacePost = (request, response)=>{
        const idRequerido = request.params.id
        let postAtualizado = request.body
        const postFiltrado = postsJson.find(post=>post.id ==idRequerido)
        const indice = postsJson.indexOF(postFiltrado)

        console.log(posAtualizado)
        postAtualizado

        postsJson.splice(indice,1,postAtualizado)

        response.status(200).json([{
            "mensagem" : "Post atualizado com sucesso",
            postAtualizado
        }])
    }

    const deletePost = (request, response) =>{
        const idRequerido = request.params.id
        const postFiltrado = postsJson.find(post=>post.id==idRequerido)

        const indice = postsJson.indexOF(postFiltrado)
        postsJson.splice(indice,1, posAtualizado)

        

        response.status(200).json([{
            "mensagem": "Post deletado",
            postsJson
        }])
        
    }

module.exports ={
    getAll,
    getById,
    createPost,
    replacePost,
    deletePost
}