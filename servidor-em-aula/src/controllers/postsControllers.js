const { request, response } = require("express")
const postsJson = require("../models/posts.json")

const getAll = (request, response)=>{
   response.status(200).json(postsJson)
}

const getById = (request, response)=>{
   const idRequerido = request.params.id
   const postFiltrado = postsJson.find(post => post.id == idRequerido)

   response.status(200).send(postFiltrado)
}

const creatPost = (request, response) =>{
   let tituloRequerido = request.body.titulo
   let conteudoRequerido = request.body.conteudo
   let etiquetasRequeridas = request.body.etiquetas

   const newPost = {
      id: Math.random().toString(32).substr(2, 6),
      datacriacao: new Date(),
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

const replacePost = (request, response)=>{
   const idRequerido = request.params.id
   let postBody = request.body
   const postFiltrado = postsJson.find(post => post.id == idRequerido)
   
   // postAtualizado.id = idRequerido
   // postAtualizado.dataCriacao = postFiltrado.dataCriacao

   let postAtualizado = {
      id: postFiltrado.id,
      datacriacao: postFiltrado.dataCriacao,
      titulo: postBody.titulo,
      conteudo: postBody.conteudo,
      etiquetas: postBody.etiquetas
   }
   
   const indice = postsJson.indexOf(postFiltrado)
   postsJson.splice(indice, 1, postAtualizado)

   response.status(200).json([{
      "mensagem": "Post subsitutido com sucesso",
      postAtualizado
   }])

}

const updateTitle = (request, response) =>{
   const idRequerido = request.params.id
   let newTitle = request.body.titulo
   const postFiltrado = postsJson.find(post => post.id == idRequerido)

   postFiltrado.titulo = newTitle

   response.status(200).json([{
      "mensagem": "titulo atualizado com sucesso",
      postFiltrado
   }])

}

const updateAnything = (request, response)=>{
   const idRequerido = request.params.id
   const atualizacaoBody =request.body
   const postFiltrado = postsJson.find(post => post.id == idRequerido)

   let listaDeChaves = Object.keys(atualizacaoBody)

   listaDeChaves.forEach((chave)=>{
      postFiltrado[chave] = atualizacaoBody[chave]
   })
   
   response.status(200).json([{
      "mensagem": "Posta atualizado com sucesso",
      postFiltrado
   }])
}



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




module.exports ={
   getAll,
   getById,
   deletePost, 
   creatPost,
   replacePost,
   updateTitle,
   updateAnything
}